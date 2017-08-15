/**
 * Created by alixez on 17-8-2.
 */

export default function (sequelize, DataTypes) {
  return sequelize.define('ActEvaluation', {
    user_id: {type: DataTypes.UUID, primaryKey: true}, // 评价人ID
    act_id: {type: DataTypes.UUID},  // 评价活动ID
    result: {type: DataTypes.BOOLEAN, defaultValue: false},                 // 评价结果
    content: {type: DataTypes.STRING},                 // 评价内容
  }, {
    classMethods: {
      associate(models) {
        this.belongsTo(models.User, {
          as: 'publisher',
          foreignKey: 'user_id',
          sourceKey: 'id',
        })
      }
    }
  });
}