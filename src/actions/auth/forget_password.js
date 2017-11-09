/**
 * Created by alixez on 17-6-17.
 */
import {getSuccessCode, getErrorCode} from '../../config/response';
import Auth from '../../utils/auth';
import sha1 from 'crypto-js/sha1';
import moment from 'moment';
import { verifyCode } from '../../utils/sms';

export default async function(req, params, {device, models, response, redisClient}) {
  if (!device) {
    throw {
      code: getErrorCode(),
      message: '请传入调用接口的设备（app/pc）'
    }
  }
  const UserModel = models.User;
  const {mobile, code, password, re_password} = req.body;

  if (! await verifyCode(mobile, code)) {
    return {
      code: response.getErrorCode(),
      message: '您的验证码错误',
    }
  }

  const user = await UserModel.findOne({where: {
    mobile: mobile
  }});


  if (!user) {
    throw {
      code: getErrorCode(),
      message: '不存在该用户',
    }
  }

  if (device === 'app') {
    if (!mobile || !code) {
      throw {
        code: getErrorCode(),
        message: '参数错误!',
      };
    }

    const ResetPasswordModel = models.ResetPasswordToken;
    const resetToken = sha1(`${user.id}.${code}.${new Date().getTime()}`).toString();

    // console.log(resetToken, '=====');

    const foundToken = await ResetPasswordModel.findOne({where: {
      user: user.id,
    }});

    if (foundToken) {
      foundToken.token = resetToken;
      foundToken.expired_at = moment().add('2', 'hours').toDate().getTime();
      await foundToken.save();
    } else {
      await ResetPasswordModel.create({
        user: user.id,
        token: resetToken,
        expired_at: moment().add('2', 'hours').toDate().getTime(),
      });
    }

    return {
      code: getSuccessCode(),
      message: '操作成功',
      data: {
        reset_token: resetToken,
      }
    }
  }

  if (device === 'pc') {
    if (!mobile || !code || !password || !re_password) {
      throw {
        code: getErrorCode(),
        message: '参数错误!',
      }
    }

    if (password !== re_password) {
      throw {
        code: getErrorCode(),
        message: '两次输入的密码不一致',
      }
    }

    user.password = Auth.encodePassword(password);

    user.update_at = new Date().getTime();

    await user.save();
    redisClient.set(`ACCESS_TOKEN_${user.id}`, null, 'EX', 60);
    return {
      code: getSuccessCode('update'),
      message: '密码修改成功',
    }
  }

}