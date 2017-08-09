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
    const foundAct = await TradeUnionAct.findOne({where: {id: actID}});
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
}