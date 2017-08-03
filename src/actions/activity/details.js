/**
 * Created by alixez on 17-7-31.
 */
import {ApprovalService} from '../../service'
export default async function (req, params, {response, models}) {
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

  const approvalService = new ApprovalService();
  const approval_temp = await approvalService.generateApprovalFlowTemp(req.user.id);

  return {
    code: response.getSuccessCode(),
    message: '获取详情成功',
    data: {
      act: foundAct,
      approval_temp: approval_temp,
    }
  }
}