/**
 * Created by alixez on 17-6-17.
 */
import Auth from '../../utils/auth';
import {getSuccessCode, getErrorCode} from '../../config/response';

export default async function (req, params, {models, device, redisClient}) {

  if (device !== 'app') {
    throw {
      code: getErrorCode(),
      message: '对方不想理你并给了你一个警告！！',
    }
  }

  const {password, re_password, reset_token} = req.body;

  if (!password || !re_password || !reset_token) {
    throw {
      code: getErrorCode(),
      message: '参数错误',
    }
  }

  if (password !== re_password) {
    throw {
      code: getErrorCode(),
      message: '两次输入的密码不一致',
    }
  }

  const ResetTokenModel = models.ResetPasswordToken;
  const UserModel = models.User;
  const resetToken = await ResetTokenModel.findOne({
    where: {
      token: reset_token,
      expired_at: {$gt: new Date().getTime()}
    }
  });
  if (!resetToken) {
    throw {
      code: getErrorCode(),
      message: '坦率的讲, 你的Token已经过期了...'
    }
  }

  const foundUser = await UserModel.findOne({
    where: {
      id: resetToken.user,
    }
  });

  if (!foundUser) {
    throw {
      code: getErrorCode(),
      message: '不知当讲不当讲，这是一个不存在的用户',
    }
  }

  foundUser.password = Auth.encodePassword(password);
  resetToken.expired_at = new Date().getTime();
  await resetToken.save();
  await foundUser.save();
  redisClient.set(`ACCESS_TOKEN_${foundUser.id}`, [], 'EX', 60);
  return {
    code: getSuccessCode('update'),
    message: '密码修改成功!',
  }
}