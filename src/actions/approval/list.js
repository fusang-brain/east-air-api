/**
 * Created by alixez on 17-8-3.
 */

export default async function (req, params, {response, models}) {
  // 获取我的未读列表和已读列表 state:1 已审 state 0 待审
  const state = req.query.state || 0;
  const Approval = models.Approval;
  const approvalList = await Approval.all({
    include: [
      {
        model: models.ApprovalFlows,
        as: 'flows',
        where: {
          approval_man_id: req.user.id,
          result: 0,
        },
        required: true,
      }
    ]
  });

  return {
    code: response.getSuccessCode(),
    message: '查看成功',
    data: {
      approval_list: approvalList,
      available: 1,
      result: state,
    }
  }
}