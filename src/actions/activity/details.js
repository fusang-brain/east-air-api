/**
 * Created by alixez on 17-7-31.
 */
import {ApprovalService, ActivityService} from '../../service';
export default async function (req, params, {response, models, device, services}) {
  const actID = req.query.act_id;
  const foundAct = await services.activity.details(actID);
  console.log(actID);
  const approval = await models.Approval.findOne({
    where: {
      project_id: foundAct.id,
    }
  });

  const approvalService = services.approval;
  const activityService = services.activity;
  console.log(approval);
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

  let evaluationStatistics = await activityService.getEvaluationStatistics(foundAct.id);

  if (foundAct.end_date <= Date.now()) {
    // evaluationStatistics = null;
  }

  return {
    code: response.getSuccessCode(),
    message: '获取详情成功',
    data: {
      act: foundAct,
      qrcode_str: qrcodeStr,
      approval_flow: approvalDetail.getDataValue('flows'),
      evaluations,
      evaluation_statistics: evaluationStatistics,
    }
  }
}