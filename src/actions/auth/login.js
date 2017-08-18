/**
 * Created by alixez on 17-6-12.
 */
import Auth from '../../utils/auth';
import {getSuccessCode, getErrorCode} from '../../config/response';
import models from '../../models';

export default async function (req, params, {device}) {

  // password should be hash by sha1 and upper
  const {mobile, password} = req.body;

  const user = await models.User.scope('with_password').findOne({
    where: {
      mobile,
    },
    include: [
      {
        model: models.Dept,
        as: 'department',
        required: false,
      },{
        model: models.Role,
        as: 'user_role',
        required: false,
        include: [
          {
            model: models.Permission,
            as: 'permissions',
          }
        ]
      }
    ]
  });

  if (!user) {
    return {
      code: getErrorCode(),
      message: '没有找到该用户',
    }
  }

  if (!Auth.validPassword(password, user.password)) {
    return {
      code: getErrorCode(),
      message: '用户名或者密码错误',
    }
  }

  const accessToken = Auth.getToken(user.id);
  //todo record token to redis

  user.password = undefined;
  const permissions = user.user_role.permissions;

  const scope = {
    modules: [],
    permissions: {}
  }
  if (device === 'pc') {
    device = 'web';
  }
  for (let i = 0; i < permissions.length; i ++) {
    let item = permissions[i];
    if (!item.RolePermission.platform === device) {
      continue;
    }
    if (!scope.modules.includes(item.module_slug)) {
      scope.modules.push(item.module_slug);
    }
    if (!scope.permissions[item.module_slug]) {
      scope.permissions[item.module_slug] = [];
    }
    scope.permissions[item.module_slug].push(item.slug);
  }
  user.user_role.setDataValue('permissions', undefined);

  return {
    code: getSuccessCode(),
    message: '登录成功!',
    data: {
      user,
      access_token: accessToken,
      scope,
    }
  }
}