/**
 * By Alpha
 * Author: alixez <alixe.z@foxmail.com>
 * Date: 2017/8/21
 */

// 意向征集
export default function (sequelize, DataTypes) {
  return sequelize.define('IntentionVote', {
    id: {type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true},
    intention_id: {type: DataTypes.UUID},
    vote_user_id: {type: DataTypes.UUID},
    vote_result: {type: DataTypes.INTEGER}, // 1 同意 2 反对
  }, {
    classMethods: {
      associate(models) {
        this.belongsTo(models.Intention, {
          foreignKey: 'intention_id',
          sourceKey: 'id',
        });
      }
    }
  });
}