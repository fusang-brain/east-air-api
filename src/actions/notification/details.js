/**
 * By Alpha
 * Author: alixez <alixe.z@foxmail.com>
 * Date: 2017/8/15
 */

import {filterParams} from '../../utils/filters';

/**
 * 通知详情
 * @param req
 * @param params
 * @param response
 * @param services
 * @returns {Promise.<{code: *, message: string, data: {notification: *}}>}
 */
export default async function (req, params, {response, services}) {
  const notificationService = services.notification;
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