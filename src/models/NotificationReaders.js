/**
 * By Alpha
 * Author: alixez <alixe.z@foxmail.com>
 * Date: 2017/8/15
 */

export default function (sequelize, DataTypes) {
  return sequelize.define('NotificationReaders', {
    id: {type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true},
    notify_id: {type: DataTypes.UUID}, // 消息ID
    user_id: {type: DataTypes.UUID}, // 用户ID
    read_at: {type: DataTypes.STRING}, // 阅读时间
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