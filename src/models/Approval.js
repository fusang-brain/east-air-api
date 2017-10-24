/**
 * Created by alixez on 17-8-1.
 */

import {generateNo} from '../utils/utils';

export default function (sequelize, DataTypes) {
  return sequelize.define('Approval', {
    id: {type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true},
    approval_no: {type: DataTypes.STRING, defaultValue: generateNo},
    approval_type: {type: DataTypes.INTEGER},  // 审批类型 1:活动 2:慰问 3:经费
    project_subject: {type: DataTypes.STRING},      // 项目主题
    project_purpose: {type: DataTypes.STRING},      // 项目目的
    project_content: {type: DataTypes.STRING},      // 项目详情
    project_type: {type: DataTypes.INTEGER},        // 项目类型 0:'职工教育', 1:'文体活动', 2:'宣传活动', 3:'其他活动', 4:'送温暖' , 5:'培训', 6:'会议', 7:'专项会议', 8:'其他业务', 9:'慰问审批', 10:'经费审批'
    dept_id: {type: DataTypes.UUID, references:{onDelete: 'cascade'}},                // 项目发起部门
    total_amount: {type: DataTypes.DECIMAL(10, 2)}, // 总金额
    project_id: {type: DataTypes.UUID},             // 审批项目ID
    publish_id: {type: DataTypes.UUID, references:{onDelete: 'cascade'}},             // 发布人ID
    publish_date: {type: DataTypes.STRING, defaultValue: Date.now},     // 发布时间
    result: {type: DataTypes.INTEGER},          // 0: 待审核 1: 已审核
  }, {
    classMethods: {
      associate(models) {
        this.hasMany(models.ApprovalFlows, {
          as: 'flows',
          foreignKey: 'approval_id',
          sourceKey: 'id',
        });

        this.belongsTo(models.Dept, {
          foreignKey: 'dept_id',
          sourceKey: 'id',
          as: 'department',
        })

        this.belongsTo(models.TradeUnionAct, {
          foreignKey: 'project_id',
          constraints: false,
          as: 'act',
        });

        this.belongsTo(models.Sympathy, {
          foreignKey: 'project_id',
          constraints: false,
          as: 'sympathy',
        });

        this.belongsTo(models.GrantApplication, {
          foreignKey: 'project_id',
          constraints: false,
          as: 'grant_application',
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