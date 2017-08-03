/**
 * Created by alixez on 17-8-3.
 */

import {ApprovalService} from '../../service';

export default async function (req, params, {response, models}) {
  const approval_id = req.query.approval_id;
  const Approval = models.Approval;
  const ApprovalFlows = models.ApprovalFlows;
  const approvalService = new ApprovalService();
  const approval = await Approval.findOne({
    where: {
      id: approval_id,
    }
  });
  const flows = approvalService.getActApproval(approval.project_id);
  approval.setDataValue('flows', flows);

  return {
    code: response.getSuccessCode(),
    message: '查询成功',
    data: {
      approval: approval,
    }
  }

}