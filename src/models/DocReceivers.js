/**
 * By Alpha
 * Author: alixez <alixe.z@foxmail.com>
 * Date: 2017/8/16
 */

// 公文表
export default function (sequelize, DataTypes) {
  return sequelize.define('DocReceivers', {
    id: {type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true},
    doc_id: {type: DataTypes.UUID},
    receiver_type: {type: DataTypes.STRING}, // 'department' or 'personal'
    receiver_id: {type: DataTypes.UUID}, // 接受者ID
  }, {
    classMethods: {
      associate(models) {
        this.belongsTo(models.Docs, {
          as: 'doc',
          foreignKey: 'doc_id',
          sourceKey: 'id',
        });
      }
    }
  });
}