/**
 * Created by alixez on 17-6-12.
 */
import Auth from '../../utils/auth';
import {getSuccessCode, getErrorCode} from '../../config/response';
import models from '../../models';

export default async function (req) {

  // password should be hash by sha1 and upper
  const {mobile, password} = req.body;

  const user = await models.User.findOne({
    where: {
      mobile,
    }
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
  //todo 记录已经签发的token to redis

  user.password = undefined;
  return {
    code: getSuccessCode(),
    message: '登录成功!',
    data: {
      user,
      access_token: accessToken,
    }
  }
}