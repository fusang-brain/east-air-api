/**
 * Created by alixez on 17-8-3.
 */

import {filterParams} from '../../utils/filters';
import ApprovalService from '../../service/ApprovalService';
import NotificationService from '../../service/NotificationService';

const approvalService = new ApprovalService();
const notificationService = new NotificationService();
export default async function (req, params, {response, checkAccess}) {
  await checkAccess('grant_approval', 'activity_funding');
  await checkAccess('grant_approval', 'apply_funding');
  const args = filterParams(req.body, {
    approval_id: 'string',
    result: 'integer',
    content: 'string',
  });

  const executeResult = await approvalService.executeApproval({
    approval_id: args.approval_id,
    result: args.result,
    content: args.content,
    user_id: req.user.id,
  });

  switch (executeResult.result) {
    case 'success':
      await notificationService.sendToPersonal({
        title: '您的申请已被同意!',
        body: args.content,
        sender: null,
        items: [
          {
            subject_id: executeResult.approval.project_id,
            subject_type: executeResult.approval.approval_type,
          }
        ],
        receiver: executeResult.approval.publish_id,
      })
      break;
    case 'refused':
      await notificationService.sendToPersonal({
        title: '您的申请已被拒绝!',
        body: args.content,
        sender: null,
        items: [
          {
            subject_id: executeResult.approval.project_id,
            subject_type: executeResult.approval.approval_type,
          }
        ],
        receiver: executeResult.approval.publish_id,
      });
      break;
  }

  return {
    code: response.getSuccessCode(),
    message: '审批处理成功',
  }
}