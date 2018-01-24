/**
 * Created by alixez on 17-7-31.
 */
import {ApprovalService, ActivityService} from '../../service';

/**
 * 活动详情
 * @param req HttpRequest object
 * @param params Request params
 * @param response Response class
 * @param models Mapper of models
 * @param device The device of user
 * @param services Mapper of services
 * @returns Object Response Object
 */
export default async function (req, params, {response, models, device, services}) {
  const actID = req.query.act_id;
  const foundAct = await services.activity.details(actID);
  let depts = null;
  if (device === 'pc') {
    depts = foundAct.accept_depts.map(item => item.dept_id);
    const deptsInfo = foundAct.accept_depts.map(item => item.dept_info);
    foundAct.setDataValue('accept_dept_ids', depts);
    foundAct.setDataValue('accept_dept_values', deptsInfo)
  } else if (device === 'app') {
    depts = foundAct.accept_depts.map(item => item.dept_info);
    foundAct.setDataValue('accept_dept_values', depts);
  }
  // delete foundAct.accept_depts;
  // foundAct.setDataValue('accept_depts', depts);
  // foundAct.accept_depts = depts;
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

  let evaluationStatistics = await activityService.getEvaluationStatistics(foundAct.id);

  if (foundAct.end_date <= Date.now()) {
    // evaluationStatistics = null;
  }

  return {
    code: response.getSuccessCode(),
    message: '获取详情成功',
    data: {
      // 活动详情
      act: foundAct,
      // 活动二维码
      qrcode_str: qrcodeStr,
      // 审批流程
      approval_flow: approvalDetail.getDataValue('flows'),
      // 评价
      evaluations,
      // 评价统计
      evaluation_statistics: evaluationStatistics,
    }
  }
}