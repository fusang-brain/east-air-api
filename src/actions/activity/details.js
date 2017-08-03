/**
 * Created by alixez on 17-7-31.
 */
import {ApprovalService} from '../../service'
export default async function (req, params, {response, models, device}) {
  const actID = req.query.act_id;
  const ActModel = models.TradeUnionAct;
  const foundAct = await ActModel.findOne({
    where: {
      id: actID,
    },
    include: [
      {
        model: models.User,
        as: 'publisher',
        required: false,
        attributes: ['id', 'name', 'avatar']
      },
      {
        model: models.Dept,
        as: 'department',
        required: false,
        attributes: ['id', 'dept_name'],
      },
      {
        model: models.GrantApplication,
        as: 'grant_apply',
        include: [
          {
            model: models.GrantItem,
            as: 'items'
          },
          {
            model: models.Dept,
            as: 'dept',
          }
        ]
      },
      {
        model: models.TradeUnionActBudget,
        as: 'budgets',
      },{
        model: models.TradeUnionActAttach,
        as: 'attach',
      },{
        model: models.TradeUnionActImage,
        as: 'images',
      }
    ]
  });
  const approval = await models.Approval.findOne({
    where: {
      project_id: foundAct.id,
    }
  });
  const approvalService = new ApprovalService();
  const approvalDetail = await approvalService.getActApprovalDetail(approval.id);
  let flows = approvalDetail.getDataValue('flows');
  if (device === 'app') {
    let f = flows.sort((a, b) => {
      return b.sort - a.sort;
    });
    approval.setDataValue('flows', f);
  }
  return {
    code: response.getSuccessCode(),
    message: '获取详情成功',
    data: {
      act: foundAct,
      approval_flow: approvalDetail.getDataValue('flows'),
    }
  }
}