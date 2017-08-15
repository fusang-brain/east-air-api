/**
 * By Alpha
 * Author: alixez <alixe.z@foxmail.com>
 * Date: 2017/8/15
 */
import NotificationService from '../../service/NotificationService';
import {filterParams} from '../../utils/filters'
const notificationService = new NotificationService();
export default async function (req, params, {response}) {
  const args = filterParams(req.query, {
    id: 'string',
  });

  const notification = await notificationService.details(args.id, req.user.id, req.user.dept);

  return {
    code: response.getSuccessCode(),
    message: '已读成功',
    data: {
      notification,
    }
  }
}