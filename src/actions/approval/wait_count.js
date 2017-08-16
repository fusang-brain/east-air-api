/**
 * Created by alixez on 17-8-10.
 */
import ApprovalService from '../../service/ApprovalService';
export default async function (req, params, {response}) {
  const approvalService = new ApprovalService();

  const activityWaitCount = await approvalService.waitCount(1, req.user.id);
  const sympathyWaitCount = await approvalService.waitCount(2, req.user.id);
  const grantWaitCount = await approvalService.waitCount(3, req.user.id);

  return {
    code: response.getSuccessCode(),
    message: '查询成功',
    data: {
      activity: parseInt(activityWaitCount) + sympathyWaitCount,
      grant: +grantWaitCount,
    }
  }
}