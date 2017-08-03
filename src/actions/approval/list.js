/**
 * Created by alixez on 17-8-3.
 */

export default async function (req, params, {response, models}) {
  // state:1 已审 state 0 待审
  const state = req.query.state || 0;
  const search = req.query.search;
  const Approval = models.Approval;
  let approvalList = [];
  if (search) {
    approvalList = await Approval.all({
      include: [
        {
          model: models.TradeUnionAct,
          as: 'act',
          where: {
            subject: {
              $like: `%${search}%`,
            }
          },
          include: [
            {
              model: models.Dept,
              as: 'department'
            }
          ],
          required: true,
        },
        {
          model: models.ApprovalFlows,
          as: 'flows',
          where: {
            approval_man_id: req.user.id,
            available: 1,
            result: state,
          },
          required: true,
        }
      ]
    });
  } else {
    approvalList = await Approval.all({
      include: [
        {
          model: models.TradeUnionAct,
          as: 'act',
          include: [
            {
              model: models.Dept,
              as: 'department'
            }
          ],
          required: false,
        },
        {
          model: models.ApprovalFlows,
          as: 'flows',
          where: {
            approval_man_id: req.user.id,
            available: 1,
            result: state,
          },
          required: true,
        }
      ]
    });
  }

  const actTypeMapper = ['职工教育', '文体活动', '宣传活动', '其他活动', '送温暖' , '培训', '会议', '专项会议', '其他业务'];
  const list = approvalList.map(loop => {
    let subject = '';
    let type = '';
    let department = '';
    let total_cost = 0;
    let content = '';
    if (loop.approval_type === 1) {
      subject = loop.act.subject;
      type = actTypeMapper[loop.act.act_type];
      department = loop.act.department;
      content = loop.act.process;
      total_cost = loop.act.budget_total;
    }

    return {
      subject,
      type,
      department,
      total_cost,
      content,
      publish_date: loop.publish_date,
      id: loop.id,
    }
  });

  return {
    code: response.getSuccessCode(),
    message: '查看成功',
    data: {
      approval_list: list,
    }
  }
}