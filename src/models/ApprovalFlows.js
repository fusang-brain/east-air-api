/**
 * Created by alixez on 17-8-1.
 */

export default function (sequelize, DataTypes) {
  return sequelize.define('ApprovalFlows', {
    id: {type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true},
    approval_id: {type: DataTypes.UUID},     // 审批ID
    flow_sort: {type: DataTypes.INTEGER},    // 审批流程序号
    approval_man_id: {type: DataTypes.UUID}, // 审批人ID
    content: {type: DataTypes.STRING, defaultValue: ''},       // 审批意见
    result: {type: DataTypes.INTEGER, defaultValue: 0},       // 审批结果 0: 待审批 1: 同意 2: 拒绝
    available: {type: DataTypes.INTEGER, defaultValue: 0},    // 审批流程可见状态 0: 不可见 1: 可见
    approval_date: {type: DataTypes.STRING}, // 审批时间
  }, {
    classMethods: {
      associate(models) {
        this.belongsTo(models.Approval, {
          as: 'approval',
          foreignKey: 'approval_id',
          sourceKey: 'id',
        });
        this.belongsTo(models.User, {
          as: 'approval_man',
          foreignKey: 'approval_man_id',
          sourceKey: 'id',
        });
      }
    }
  });
}