/**
 * By Alpha
 * Author: alixez <alixe.z@foxmail.com>
 * Date: 2017/8/15
 */

export default function (sequelize, DataTypes) {
  return sequelize.define('Notification', {
    id: {type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true},
    notify_type: {type: DataTypes.INTEGER}, // 0：系统消息 1：业务消息
    title: {type: DataTypes.STRING}, // 消息标题
    content: {type: DataTypes.STRING}, // 消息内容
    sender_id: {type: DataTypes.STRING}, // 发送人ID
    send_time: {type: DataTypes.STRING, defaultValue: Date.now}, // 发送时间
  }, {
    classMethods: {
      associate(models) {
        this.hasMany(models.NotificationItems, {
          as: 'items',
          foreignKey: 'notify_id',
          sourceKey: 'id',
        });

        this.hasMany(models.NotificationReceivers, {
          as: 'receivers',
          foreignKey: 'notify_id',
          sourceKey: 'id',
        });

        this.hasMany(models.NotificationReaders, {
          as: 'readers',
          foreignKey: 'notify_id',
          sourceKey: 'id',
        });
      }
    }
  });
}