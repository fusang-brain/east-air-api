/**
 * Created by alixez on 17-8-3.
 */

import {ApprovalService} from '../../service';

export default async function (req, params, {response, device}) {
  const approval_id = req.query.approval_id;
  const approvalService = new ApprovalService();
  const approval = await approvalService.getApprovalDetail(approval_id);

  console.log(approval, '=====')

  const flows = approval.getDataValue('flows');
  const currentUserFlow = flows.find(item => {
    return item.user_id === req.user.id;
  });
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