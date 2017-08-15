/**
 * By Alpha
 * Author: alixez <alixe.z@foxmail.com>
 * Date: 2017/8/15
 */

import NotificationService from '../../service/NotificationService';
const notificationService = new NotificationService();

export default async function (req, params, {response}) {
  const offset = parseInt(req.query.offset) || 0;
  const limit = parseInt(req.query.limit) || 20;
  const {total, notifications} = await notificationService.notificationList(offset, limit, req.user.dept, req.user.id);

  return {
    code: response.getSuccessCode(),
    message: '查询成功',
    data: {
      total,
      notifications
    }
  }
}