/**
 * Created by alixez on 17-8-1.
 */

import {generateNo} from '../utils/utils';

export default function (sequelize, DataTypes) {
  return sequelize.define('Approval', {
    id: {type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true},
    approval_no: {type: DataTypes.STRING, defaultValue: generateNo},
    approval_type: {type: DataTypes.INTEGER},  // 审批类型 1:活动
    project_id: {type: DataTypes.UUID},        // 审批项目ID
    publish_id: {type: DataTypes.UUID},        // 发布人ID
    publish_date: {type: DataTypes.STRING},     // 发布时间
    result: {type: DataTypes.INTEGER},          // 0: 待审核 1: 已审核
  }, {
    classMethods: {
      associate(models) {
        this.hasMany(models.ApprovalFlows, {
          as: 'flows',
          foreignKey: 'approval_id',
          sourceKey: 'id',
        });

        this.belongsTo(models.User, {
          as: 'publisher',
          foreignKey: 'publish_id',
          sourceKey: 'id',
        });
      }
    }
  });
}