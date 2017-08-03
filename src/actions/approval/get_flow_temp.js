/**
 * Created by alixez on 17-8-3.
 */

import {ApprovalService} from '../../service';

export default async function (req, params, {response}) {

  const approvalService = new ApprovalService();

  const temp = await approvalService.generateApprovalFlowTemp(req.user.id);

  return {
    code: response.getSuccessCode(),
    message: '查看成功',
    data: {
      temp: temp,
    }
  }
}