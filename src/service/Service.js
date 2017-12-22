/**
 * Created by alixez on 17-8-2.
 */
import {sequelize, Sequelize} from '../models';
import models from '../models';

export default class Service {

  constructor() {
    this.modelName = '';
    this.connect = sequelize;
    this.sequelize = Sequelize;
    this.dataAccess = [];
  }

  /**
   * 获取数据模型
   * @param modelName
   * @returns {*}
   */
  getModel(modelName=null) {
    if (!modelName) {
      return models[this.modelName];
    }

    return models[modelName];
  }

  /**
   * 判断活动（活动、经费 ...）
   * @param id: subjectID
   * @returns {Promise.<boolean>}
   */
  async isActivityCanUpdateOrDelete (id) {

    const Approval = this.getModel('Approval');
    const ApprovalFlows = this.getModel('ApprovalFlows');

    const foundApproval = await Approval.findOne({where: {project_id: id}});

    // 判断活动是否在审批流程中
    if (foundApproval) {
      const count = await ApprovalFlows.count({ where: { approval_id: foundApproval.id, result: { $in: [1, 2] } }});
      if (count > 0) {
        return false;
      }
    }

    return true;
  }
}