/**
 * By Alpha
 * Author: alixez <alixe.z@foxmail.com>
 * Date: 2017/11/17
 */

export default async (req, params, { response, services }) => {
  const offset = parseInt(req.query.offset) || 0;
  const limit = parseInt(req.query.limit) || 20;
  // const unreadCount = await services.notification.notificationList(offset, limit, req.user.dept, req.user.id);
  const unreadCount = await services.notification.unreadCount(req.user.dept, req.user.id);
  console.log(unreadCount, 'unreadCount');
  return {
    code: response.getSuccessCode(),
    message: '查询成功',
    data: {
      hasMessage: unreadCount > 0,
    }
  }
}