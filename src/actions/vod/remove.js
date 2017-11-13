/**
 * By Alpha
 * Author: alixez <alixe.z@foxmail.com>
 * Date: 2017/11/11
 */

export default async function (req, params, { response, services }) {
  const { id } = req.body;

  const removeResult = await services.vod.remove(id);

  if (removeResult === null) {
    return {
      code: response.getErrorCode('delete'),
      message: 'Not Found',
    }
  }

  if (!removeResult) {
    return {
      code: response.getErrorCode('delete'),
      message: '未知错误',
    }
  }

  return {
    code: response.getSuccessCode('delete'),
    message: '删除成功',
  }
}