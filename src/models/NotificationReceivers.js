/**
 * By Alpha
 * Author: alixez <alixe.z@foxmail.com>
 * Date: 2017/8/15
 */

export default function (sequelize, DataTypes) {
  return sequelize.define('NotificationReceivers', {
    id: {type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true},
    notify_id: {type: DataTypes.UUID}, // 消息ID
    receiver_type: {type: DataTypes.STRING}, // 接受者类型 'department' 组织部门 'personal' 个人
    receiver_id: {type: DataTypes.UUID}, // 接受者ID
  }, {
    classMethods: {
      associate(models) {
        this.belongsTo(models.Notification, {
          as: 'notify',
          foreignKey: 'notify_id',
          sourceKey: 'id',
          onDelete: 'cascade',
        })
      }
    }
  });
}