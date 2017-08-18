/**
 * Created by alixez on 17-8-3.
 */

import {ApprovalService} from '../../service';

export default async function (req, params, {response, device, services}) {
  const approval_id = req.query.approval_id;
  const approvalService = services.approval;
  const approval = await approvalService.getApprovalDetail(approval_id);

  const flows = approval.getDataValue('flows');
  const currentUserFlow = flows.find(item => {
    return (item.user_id === req.user.id && item.available === 1);
  });
  // console.log(currentUserFlow);
  if (!currentUserFlow) {
    throw {
      code: response.getErrorCode(),
      message: '您没有查看该审批的权限'
    }
  }
  approval.setDataValue('approval_state', currentUserFlow.result);
  if (device === 'app') {
    let f = flows.sort((a, b) => {
      return b.sort - a.sort;
    });
    approval.setDataValue('flows', f);
  }
  return {
    code: response.getSuccessCode(),
    message: '查询成功',
    data: {
      approval: approval,
    }
  }

}