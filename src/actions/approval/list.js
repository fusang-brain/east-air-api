/**
 * Created by alixez on 17-8-3.
 */

export default async function (req, params, {response, models}) {
  // state:0 待审 state:1 已审 state:2 全部
  const state = +req.query.state || 0;
  const search = req.query.search;
  const offset = parseInt(req.query.offset) || 0;
  const limit = parseInt(req.query.limit) || 20;
  const Approval = models.Approval;
  let stateCondition = [0];
  if (state === 1) {
    stateCondition = [1,2];
  }
  if (state === 2) {
    stateCondition = [0,1,2];
  }
  let approvalList = [];
  let total = 0;
  let undo_total = await Approval.count({
    include: [
      {
        model: models.ApprovalFlows,
        as: 'flows',
        where: {
          approval_man_id: req.user.id,
          available: 1,
          result: 0,
        },
        required: true,
      }
    ]
  });
  if (search) {
    total = await Approval.count({
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
            result: {
              $in: stateCondition
            },
          },
          required: true,
        }
      ]
    });
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
            result: {
              $in: stateCondition
            },
          },
          required: true,
        }
      ],
      offset,
      limit,
    });
  } else {
    total = await Approval.count({
      include: [
        {
          model: models.ApprovalFlows,
          as: 'flows',
          where: {
            approval_man_id: req.user.id,
            available: 1,
            result: {
              $in: stateCondition
            },
          },
          required: true,
        }
      ]
    });
    approvalList = await Approval.all({
      offset,
      limit,
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
            result: {
              $in: stateCondition
            },
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
    let approval_type = 0;
    let department = '';
    let total_cost = 0;
    let content = '';
    let approval_state = 0;
    if (loop.approval_type === 1) {
      subject = loop.act.subject;
      type = actTypeMapper[loop.act.act_type];
      approval_type = loop.approval_type;
      department = loop.act.department;
      content = loop.act.process;
      approval_state = loop.flows[0].result;
      total_cost = loop.act.budget_total;
    }

    return {
      subject,
      type,
      department,
      total_cost,
      content,
      approval_type,
      approval_state,
      publish_date: loop.publish_date,
      id: loop.id,
    }
  });

  return {
    code: response.getSuccessCode(),
    message: '查看成功',
    data: {
      undo_total: undo_total,
      total: total,
      approval_list: list,
    }
  }
}