/**
 * Created by alixez on 17-8-3.
 */

/**
 *
 * @param req HttpRequest object
 * @param params HttpParams
 * @param response Response object
 * @param checkAccess the function to check access
 * @param services Mapper services
 * @returns Object API Response object
 */
export default async function (req, params, {response, checkAccess, services}) {
  // state:all 全部 state:pending 待处理 state:success 已同意 state:failed 已拒绝 state:finished 已处理
  const state = req.query.state || 'all';
  const search = req.query.search;
  const offset = parseInt(req.query.offset) || 0;
  const limit = parseInt(req.query.limit) || 20;
  const selectType = params[0] || 'all';
  switch (selectType) {
    case 'all':
      await checkAccess('grant_approval', 'activity_funding');
      await checkAccess('grant_approval', 'apply_funding');
      break;
    case 'act':
      await checkAccess('grant_approval', 'activity_funding');
      break;
    case 'grant':
      await checkAccess('grant_approval', 'apply_funding');
      break;
    default:
      throw {
        code: response.getErrorCode(),
        message: '未知的请求类型',
      }
      break;
  }
  const {undo_total, total, approvals} = await services.approval.approvalList({
    state,
    search,
    offset,
    limit,
    user_id: req.user.id,
    type: selectType,
    dataAccess: req.dataAccess});
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
      project_purpose: loop.project_purpose,
      project_content: loop.project_content,
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