/**
 * By Alpha
 * Author: alixez <alixe.z@foxmail.com>
 * Date: 2017/8/15
 */

import NotificationService from '../../service/NotificationService';

const notificationService = new NotificationService();
export default async function (req, params, {response}) {
  await notificationService.sendToPersonal({
    title: '消息1',
    body: 'sfasfasfasf',
    sender: req.user.id,
    items: [
      {
        subject_type: 1,
        subject_id: '0121b9ec-7fbc-40ee-bc2a-e530cb924857',
      }
    ],
    receiver: '84c75e4c-5751-4375-9b8f-b2cab9e8befc',
  });

  await notificationService.sendToDepartment({
    title: '部门消息',
    body: '部门消息',
    sender: req.user.id,
    items: [
      {
        subject_type: 1,
        subject_id: '0121b9ec-7fbc-40ee-bc2a-e530cb924857',
      }
    ],
    department: '0335676d-f0ad-428e-bcb0-bf7c99a2560a',
  });

  return {
    code: response.getSuccessCode(),
    message: '发送成功',
  }
}