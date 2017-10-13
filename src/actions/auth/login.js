/**
 * Created by alixez on 17-6-12.
 */
import Auth from '../../utils/auth';
import {getSuccessCode, getErrorCode} from '../../config/response';
import models from '../../models';

export default async function (req, params, {device, redisClient}) {

  // password should be hash by sha1 and upper
  const {mobile, password} = req.body;

  const user = await models.User.scope('with_password').findOne({
    where: {
      mobile,
      state: {
        $in: [1, 0],
      }
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

  let cacheToken = await redisClient.getAsync(`ACCESS_TOKEN_${user.id}`);
  if (!cacheToken) {
    redisClient.set(`ACCESS_TOKEN_${user.id}`, accessToken, 'EX', 7 * 24 * 60 * 60);
  } else {
    const cacheTokenArr = cacheToken.split(',');
    console.log(cacheTokenArr);
    cacheTokenArr.push(accessToken);
    redisClient.set(`ACCESS_TOKEN_${user.id}`, cacheTokenArr.join(','), 'EX', 7 * 24 * 60 * 60);
  }

  user.password = undefined;

  const permissions = user.user_role.permissions;

  const originPermissions = await models.RolePermission.all({
    where: {
      role_id: user.role
    },
    include: [
      {
        model: models.Permission,
        as: 'permission',
      }
    ]
  });

  const scope = {
    modules: [],
    permissions: {}
  }
  if (device === 'pc') {
    device = 'web';
  }

  for (let i = 0; i < originPermissions.length; i ++) {
    let item = originPermissions[i];
    if (item.platform !== device) {
      continue;
    }
    if (!scope.modules.includes(item.permission.module_slug)) {
      scope.modules.push(item.permission.module_slug);
    }
    if (!scope.permissions[item.permission.module_slug]) {
      scope.permissions[item.permission.module_slug] = [];
    }
    scope.permissions[item.permission.module_slug].push(item.permission.slug);
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