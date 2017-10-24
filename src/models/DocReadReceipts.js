/**
 * By Alpha
 * Author: alixez <alixe.z@foxmail.com>
 * Date: 2017/8/17
 */

export default (sequelize, DataTypes) => sequelize.define('DocReadReceipts', {
  id: {type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true},
  doc_id: {type: DataTypes.UUID},
  user_id: {type: DataTypes.UUID},
  read_time: {type: DataTypes.STRING},
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