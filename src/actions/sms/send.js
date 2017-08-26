/**
 * By Alpha
 * Author: alixez <alixe.z@foxmail.com>
 * Date: 2017/8/26
 */
import { filterParams } from '../../utils/filters'
import { sendCode } from '../../utils/sms';
import config from '../../config/api';

export default async (req, params, {response}) => {
  const args = filterParams(req.body, {
    mobile: ['string', 'required'],
  });

  const res = await sendCode(args.mobile);

  if (res) {
    if (config.debug) {
      return {
        code: response.getSuccessCode(),
        message: '测试模式，给你你的验证码! -----> ' + res,
      }
    }

    return {
      code: response.getSuccessCode(),
      message: '验证码发送成功',
    }
  }

  return {
    code: response.getErrorCode(),
    message: '未知错误',
  }
}