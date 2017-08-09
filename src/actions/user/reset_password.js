/**
 * Created by alixez on 17-7-28.
 */
import Auth from '../../utils/auth';
import {filterParams} from '../../utils/filters';

export default async function (req, params, {response, models, device}) {
  const args = filterParams(req.body, {
    origin_password: 'string',
    password: ['string', 'required'],
    re_password: ['string', 'required'],
  });
  const user = req.user;
  if (device === 'pc') {
    if (!args.origin_password) {
      return {
        code: response.getErrorCode(),
        message: '参数异常',
      }
    }

    const foundUser = await models.User.scope('with_password').findOne({where: {id: user.id}});
    if (!Auth.validPassword(args.origin_password, foundUser.password)) {
      return {
        code: response.getErrorCode(),
        message: '请输入正确的原始密码',
      }
    }
  }
  if (args.password !== args.re_password) {
    return {
      code: response.getErrorCode(),
      message: '两次输入的密码不一致',
    }
  }

  await models.User.update({
    password: Auth.encodePassword(args.password),
  }, {
    where: {id: user.id}
  });

  return {
    code: response.getSuccessCode(),
    message: '密码修改成功',
  }
}