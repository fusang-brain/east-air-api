/**
 * By Alpha
 * Author: alixez <alixe.z@foxmail.com>
 * Date: 2017/8/15
 */

export default function (sequelize, DataTypes) {
  return sequelize.define('NotificationItems', {
    id: {type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true},
    notify_id: {type: DataTypes.UUID}, // 消息ID
    subject_type: {type: DataTypes.INTEGER}, // 1: 活动 2：经费 3：慰问 4:公文
    subject_id: {type: DataTypes.UUID}, // 项目ID
    is_approval: {type: DataTypes.BOOLEAN, defaultValue: false}, // 是否是审批类型
  }, {
    classMethods: {
      associate(models) {
        this.belongsTo(models.Notification, {
          as: 'notify',
          foreignKey: 'notify_id',
          sourceKey: 'id',
          onDelete: 'cascade',
        });
      }
    }
  });
}