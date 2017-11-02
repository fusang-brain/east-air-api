/**
 * By Alpha
 * Author: alixez <alixe.z@foxmail.com>
 * Date: 2017/8/15
 */

/**
 * 通知列表
 * @param req
 * @param params
 * @param response
 * @param services
 * @returns {Promise.<{code: *, message: string, data: {total: *, notifications: *}}>}
 */
export default async function (req, params, {response, services}) {
  const offset = parseInt(req.query.offset) || 0;
  const limit = parseInt(req.query.limit) || 20;
  const {total, notifications} = await services.notification.notificationList(offset, limit, req.user.dept, req.user.id);

  return {
    code: response.getSuccessCode(),
    message: '查询成功',
    data: {
      total,
      notifications
    }
  }
}