/**
 * Created by alixez on 17-8-3.
 */

import {filterParams} from '../../utils/filters';
export default async function (req, params, {response, models}) {
  const args = filterParams(req.body, {
    approval_id: 'string',
    result: 'integer',
    content: 'string',
  });

  const ApprovalFlows = models.ApprovalFlows;
  const foundApprovalFlow = await ApprovalFlows.findOne({
    where: {
      approval_id: args.approval_id,
      approval_man_id: req.user.id,
    }
  });

  if (!foundApprovalFlow) {
    return {
      code: response.getErrorCode(),
      message: '非法请求!'
    }
  }

  foundApprovalFlow.content = args.content;
  foundApprovalFlow.result = args.result;
  foundApprovalFlow.approval_date = Date.now();
  await foundApprovalFlow.save();

  await ApprovalFlows.update({
    available: 1,
  },{
    where: {
      approval_id: args.approval_id,
      flow_sort: foundApprovalFlow.flow_sort + 1,
    }
  });

  return {
    code: response.getSuccessCode(),
    message: '审批处理成功',
  }
}