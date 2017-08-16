/**
 * Created by alixez on 17-8-7.
 */
import Service from './Service';
import Response from '../config/response';

export default class ActivityService extends Service {
  constructor() {
    super();
    this.modelName = 'TradeUnionAct';
  }

  async remove(id) {
    const TradeUnionAct = this.getModel();
    const Approval = this.getModel('Approval');
    const ApprovalFlows = this.getModel('ApprovalFlows');
    const foundAct = await TradeUnionAct.findOne({where: {id: id}});
    const foundApproval = await Approval.findOne({where: {project_id: id}});
    if (!foundAct) {
      return {
        code: Response.getSuccessCode(),
        message: '没有找到您要删除的活动',
      }
    }
    if (![0, 3].includes(foundAct.state)) {
      return {
        code: Response.getErrorCode('remove'),
        message: '此活动无法删除',
      }
    }
    await Approval.destroy({where: {project_id: id}});
    if (foundApproval) {
      await ApprovalFlows.destroy({where: {approval_id: foundApproval.id}});
    }
    await TradeUnionAct.destroy({where: {id: id}});

    return true;
  }

  async details(id) {
    const User = this.getModel('User');
    const Dept = this.getModel('Dept');
    const Act = this.getModel('TradeUnionAct');
    const GrantApplication = this.getModel('GrantApplication');
    const GrantItem = this.getModel('GrantItem');
    const TradeUnionActBudget = this.getModel('TradeUnionActBudget');
    const TradeUnionActAttach = this.getModel('TradeUnionActAttach');
    const TradeUnionActImage = this.getModel('TradeUnionActImage');

    return await Act.findOne({
      where: {id},
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
          attributes: ['id', 'dept_name'],
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
        }
      ]
    });

  }

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
}