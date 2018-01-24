/**
 * Created by alixez on 17-8-7.
 */
import Service from './Service';
import Response from '../config/response';

export default class ActivityService extends Service {
  constructor() {
    super();
    this.modelName = 'TradeUnionAct';
    this.dataAccess = [];
  }

  /**
   * 通过ID删除活动
   * @param id
   * @param userID
   * @returns {Promise.<*>}
   */
  async remove(id, userID) {
    const TradeUnionAct = this.getModel();
    const Approval = this.getModel('Approval');
    const ApprovalFlows = this.getModel('ApprovalFlows');
    const foundAct = await TradeUnionAct.findOne({where: {id: id, dept_id: {$in: this.dataAccess}}});
    const foundApproval = await Approval.findOne({where: {project_id: id}});
    if (!foundAct) {

      throw {
        code: Response.getErrorCode('remove'),
        data: {},
        message: '没有找到您要删除的活动',
      }
    }

    if (foundAct.user_id !== userID) {
      throw {
        code: Response.getErrorCode(),
        data: {},
        message: '您无法删除该活动'
      }
    }

    // if (![0, 3].includes(foundAct.state)) {
    //   return {
    //     code: Response.getErrorCode('remove'),
    //     // message: '此活动无法删除',
    //     message: '该活动已经审批无法删除',
    //   }
    // }

    // 判断活动状态
    // if (+foundAct.state === 3) {
    //   console.log(Response.getErrorCode('remove'));
    //   throw {
    //     code: Response.getErrorCode('remove'),
    //     data: {},
    //     message: '该活动无法删除',
    //   }
    // }

    // 判断活动是否在审批流程中
    if (foundApproval) {
      const count = await ApprovalFlows.count({ where: { approval_id: foundApproval.id, result: { $in: [1, 2] } }});
      if (count > 0 && foundAct.state !== 3) {
        throw {
          code: Response.getErrorCode('remove'),
          data: {},
          message: '该活动已经审批无法删除',
        }
      }
    }

    await Approval.destroy({where: {project_id: id}});
    if (foundApproval) {
      await ApprovalFlows.destroy({where: {approval_id: foundApproval.id}});
    }
    console.log('活动 === ', id);
    await TradeUnionAct.destroy({where: { id: id }});

    return true;
  }

  /**
   * 获取活动详情
   * @param id
   * @returns {Promise.<*>}
   */
  async details(id) {
    const User = this.getModel('User');
    const Dept = this.getModel('Dept');
    const Act = this.getModel('TradeUnionAct');
    const GrantApplication = this.getModel('GrantApplication');
    const GrantItem = this.getModel('GrantItem');
    const TradeUnionActBudget = this.getModel('TradeUnionActBudget');
    const TradeUnionActAttach = this.getModel('TradeUnionActAttach');
    const TradeUnionActImage = this.getModel('TradeUnionActImage');

    const actDetails = await Act.findOne({
      where: {
        id,
      },
      include: [
        {
          model: User,
          as: 'publisher',
          required: false,
          attributes: ['id', 'name', 'avatar']
        },
        {
          model: Dept,
          as: 'department',
          required: false,
          attributes: ['id', 'dept_name' ],
        },
        {
          model: GrantApplication,
          as: 'grant_apply',
          include: [
            {
              model: GrantItem,
              as: 'items'
            },
            {
              model: Dept,
              as: 'dept',
            }
          ]
        },
        {
          model: TradeUnionActBudget,
          as: 'budgets',
        },{
          model: TradeUnionActAttach,
          as: 'attach',
        },{
          model: TradeUnionActImage,
          as: 'images',
        },{
          model: this.getModel('TradeUnionActDept'),
          as: 'accept_depts',
          include: [
            {
              model: this.getModel('Dept'),
              as: 'dept_info',
            }
          ]
        }
      ]
    });
    actDetails.budgets = actDetails.budgets.sort((a, b) => {
      return a.sort > b.sort;
    });
    return actDetails;
  }

  /**
   * 获取所有评价
   * @param act_id
   * @returns {Promise.<*>}
   */
  async getEvaluations(act_id) {
    const ActEvaluation = this.getModel('ActEvaluation');

    return await ActEvaluation.all({
      where: {
        act_id: act_id,
      },
      include: [
        {
          model: this.getModel('User'),
          as: 'publisher',
          attributes: ['id', 'name', 'avatar']
        }
      ]
    })
  }

  /**
   * 活动签到
   * @param id
   * @param dept_id
   * @param user_id
   * @returns {Promise.<{hasSigned: boolean, act_name: (TradeUnionAct.subject|{type, length}|*|Array), total_integration: *, current_integration: number}>}
   */
  async sign(id, dept_id, user_id) {
    const foundAct = await this.getModel().findOne({
      where: {
        id,
        dept_id,
      }
    });

    if (!foundAct) {
      throw {
        code: Response.getErrorCode(),
        message: '没有找到您要签到的活动',
      }
    }

    if (foundAct.state !== 2) {
      throw {
        code: Response.getErrorCode(),
        message: '该活动未通过审批，无法签到',
      }
    }

    // if (foundAct.end_date <= Date.now()) {
    //   throw {
    //     code: Response.getErrorCode(),
    //     message: '活动未完成，无法签到',
    //   }
    // }

    const TradeUnionActActors = this.getModel('TradeUnionActActors');

    let foundActor = await TradeUnionActActors.findOne({
      where: {
        act_id: id,
        user_id,
      }
    });

    let integration = 0;
    let hasSigned = true;

    if (!foundActor) {
      foundActor = await TradeUnionActActors.create({
        act_id: id,
        user_id: user_id,
      });
      hasSigned = false;

      integration = +foundAct.integration;
    }

    const foundUser = await this.getModel('User').findOne({
      where: {
        id: user_id,
      }
    });

    foundUser.integration = foundUser.integration + integration;
    await foundUser.save();

    return {
      hasSigned,
      act_name: foundAct.subject,
      total_integration: foundUser.integration,
      current_integration: integration,
    };
  }

  /**
   * 获取活动统计
   * @param act_id
   * @returns {Promise.<{total_actor: *, total_people: *, total: *, satisfied_rate: number}>}
   */
  async getEvaluationStatistics(act_id) {

    const foundAct = await this.getModel('TradeUnionAct').findOne({
      where: {
        id: act_id,
      },
      include: [
        {
          model: this.getModel('TradeUnionActDept'),
          as: 'accept_depts',
          include: [
            {
              model: this.getModel('Dept'),
              as: 'dept_info',
            }
          ]
        }
      ]
    });

    const allLevel2Depts = [];
    const allLevel3Depts = [];
    foundAct.accept_depts.forEach(dept => {
      if (dept.dept_info.tree_level === 2) {
        allLevel2Depts.push(dept.dept_id);
      }
      if (dept.dept_info.tree_level === 3) {
        allLevel3Depts.push(dept.dept_id);
      }
    })

    // 获取活动归属部门
    const otherLevel3Depts = await this.getModel('Dept').all({
      where: {
        parent: {
          $in: allLevel2Depts,
        }
      }
    });

    otherLevel3Depts.forEach(dept => {
      allLevel3Depts.push(dept.id);
    });

    const totalUser = await this.getModel('User').count({
      where: {
        name: {
          $ne: 'root',
        },
        dept: {
          $in: allLevel3Depts,
        },
      }
    });

    const TradeUnionActActors = this.getModel('TradeUnionActActors');

    const totalActor = await TradeUnionActActors.count({
      where: {
        act_id: foundAct.id,
      }
    });

    const evaluatePeopleCount = await this.getModel('ActEvaluation').count({
      where: {
        act_id,
      }
    });

    const satisfiedPeopleCount = await this.getModel('ActEvaluation').count({
      where: {
        act_id,
        result: true,
      }
    });

    return {
      total_actor: totalActor, // 总参与者
      total_people: totalUser, // 总人数
      total: evaluatePeopleCount, // 总数
      satisfied_rate: Math.round(satisfiedPeopleCount / evaluatePeopleCount * 100) || 0, // 满意率
    }
  }
}