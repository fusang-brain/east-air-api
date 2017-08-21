/**
 * By Alpha
 * Author: alixez <alixe.z@foxmail.com>
 * Date: 2017/8/20
 */

export default async (req, params, {response, services}) => {
  const id = req.query.id;

  if (!id) {
    return {
      code: response.getErrorCode(),
      message: '参数错误',
    }
  }

  const receivers = await services.doc.getUnreadDetails(id);

  return {
    code: response.getSuccessCode(),
    message: '查询成功',
    data: {
      receivers,
    }
  }
}