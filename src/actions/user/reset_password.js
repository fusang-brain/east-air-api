/**
 * Created by alixez on 17-7-28.
 */
import Auth from '../../utils/auth';
import {filterParams} from '../../utils/filters';

export default async function (req, params, {response, models}) {
  const args = filterParams(req.body, {
    password: ['string', 'required'],
    re_password: ['string', 'required'],
  });
  const user = req.user;
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