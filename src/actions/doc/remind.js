/**
 * By Alpha
 * Author: alixez <alixe.z@foxmail.com>
 * Date: 2017/8/21
 */

export default async (req, params, {response, services}) => {

  // todo reminder

  return {
    code: response.getSuccessCode(),
    message: '提醒成功！',
  }
}