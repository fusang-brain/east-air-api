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
  const Act = models.TradeUnionAct;
  const foundApprovalFlow = await ApprovalFlows.findOne({
    where: {
      approval_id: args.approval_id,
      approval_man_id: req.user.id,
    },
    include: [
      {
        model: models.Approval,
        as: 'approval',
      },
      {
        model: models.User,
        as: 'approval_man',
        include: {
          model: models.Role,
          as: 'user_role',
        }
      }
    ]
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
  if (args.result === 1) {
    if (foundApprovalFlow.approval_man.user_role.role_slug === 'dept_master') {
      await Act.update({
        state: 2,
      }, {
        where: {
          id: foundApprovalFlow.approval.project_id
        }
      });
    } else {
      await ApprovalFlows.update({
        available: 1,
      },{
        where: {
          approval_id: args.approval_id,
          flow_sort: foundApprovalFlow.flow_sort + 1,
        }
      });
    }
  }

  if (args.result === 2) {
    console.log(foundApprovalFlow.approval.project_id);
    await Act.update({
      state: 3,
    }, {
      where: {
        id: foundApprovalFlow.approval.project_id
      }
    });
  }

  return {
    code: response.getSuccessCode(),
    message: '审批处理成功',
  }
}