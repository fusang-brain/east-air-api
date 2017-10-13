/**
 * By Alpha
 * Author: alixez <alixe.z@foxmail.com>
 * Date: 2017/8/21
 */

export default async (req, params, {response, services}) => {
  const total = await services.doc.unreadTotal(req.user.id);

  return {
    code: response.getSuccessCode(),
    message: '未读数查询成功',
    data: {
      unread_total: total,
    }
  }
}