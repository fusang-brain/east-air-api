/**
 * Created by alixez on 17-7-31.
 */
import {ApprovalService, ActivityService} from '../../service';
export default async function (req, params, {response, models, device, services}) {
  const actID = req.query.act_id;

  // const ActModel = models.TradeUnionAct;
  // const foundAct = await ActModel.findOne({
  //   where: {
  //     id: actID,
  //     dept_id: {
  //       $in: req.dataAccess,
  //     }
  //   },
  //   include: [
  //     {
  //       model: models.User,
  //       as: 'publisher',
  //       required: false,
  //       attributes: ['id', 'name', 'avatar']
  //     },
  //     {
  //       model: models.Dept,
  //       as: 'department',
  //       required: false,
  //       attributes: ['id', 'dept_name'],
  //     },
  //     {
  //       model: models.GrantApplication,
  //       as: 'grant_apply',
  //       include: [
  //         {
  //           model: models.GrantItem,
  //           as: 'items'
  //         },
  //         {
  //           model: models.Dept,
  //           as: 'dept',
  //         }
  //       ]
  //     },
  //     {
  //       model: models.TradeUnionActBudget,
  //       as: 'budgets',
  //     },{
  //       model: models.TradeUnionActAttach,
  //       as: 'attach',
  //     },{
  //       model: models.TradeUnionActImage,
  //       as: 'images',
  //     }
  //   ]
  // });
  const foundAct = await services.activity.details(actID);
  const approval = await models.Approval.findOne({
    where: {
      project_id: foundAct.id,
    }
  });

  const approvalService = services.approval;
  const activityService = services.activity;
  const approvalDetail = await approvalService.getActApprovalDetail(approval.id);
  let flows = approvalDetail.getDataValue('flows');
  if (device === 'app') {
    let f = flows.sort((a, b) => {
      return b.sort - a.sort;
    });
    approval.setDataValue('flows', f);
  }
  const evaluations = await activityService.getEvaluations(foundAct.id);
  const qrcodeStr = `eastern://sign_act?act_id=${foundAct.id}`;
  return {
    code: response.getSuccessCode(),
    message: '获取详情成功',
    data: {
      act: foundAct,
      qrcode_str: qrcodeStr,
      approval_flow: approvalDetail.getDataValue('flows'),
      evaluations,
    }
  }
}