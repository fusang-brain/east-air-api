/**
 * Created by alixez on 17-8-3.
 */

import ApprovalService from '../../service/ApprovalService';
const approvalService = new ApprovalService();

export default async function (req, params, {response, models}) {
  // state:all 全部 state:pending 待处理 state:success 已同意 state:failed 已拒绝 state:finished 已处理
  const state = +req.query.state || 0;
  const search = req.query.search;
  const offset = parseInt(req.query.offset) || 0;
  const limit = parseInt(req.query.limit) || 20;
  const selectType = params[0] || 'all';

  const {undo_total, total, approvals} = await approvalService.approvalList({state, search, offset, limit, user_id: req.user.id, type: selectType})
  const typeMapper = ['职工教育', '文体活动', '宣传活动', '其他活动', '送温暖' , '培训', '会议', '专项会议', '其他业务', '慰问审批', '经费审批'];

  const returnList = approvals.map(loop => {

    return {
      project_subject: loop.project_subject,
      project_type: loop.project_type,
      project_type_string: typeMapper[+loop.project_type],
      dept_name: loop.department.dept_name,
      total_amount: loop.total_amount,
      approval_type: loop.approval_type,
      approval_state: loop.flows[0].result,
      publish_date: loop.publish_date,
      id: loop.id,
    }
  });

  return {
    code: response.getSuccessCode(),
    message: '查看成功',
    data: {
      undo_total: +undo_total,
      total: +total,
      approval_list: returnList,
    }
  }
}