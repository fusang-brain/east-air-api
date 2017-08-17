/**
 * Created by alixez on 17-8-10.
 */
import ApprovalService from '../../service/ApprovalService';
export default async function (req, params, {response, checkAccess}) {
  const approvalService = new ApprovalService();
  let activityWaitCount = 0;
  let sympathyWaitCount = 0;
  let grantWaitCount = 0;
  if (checkAccess('grant_approval', 'activity_funding', false)) {
    activityWaitCount = await approvalService.waitCount(1, req.user.id);
    sympathyWaitCount = await approvalService.waitCount(2, req.user.id);
  }
  if (checkAccess('grant_approval', 'apply_funding', false)) {
    grantWaitCount = await approvalService.waitCount(3, req.user.id);
  }



  return {
    code: response.getSuccessCode(),
    message: '查询成功',
    data: {
      activity: parseInt(activityWaitCount) + sympathyWaitCount,
      grant: +grantWaitCount,
    }
  }
}