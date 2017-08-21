/**
 * By Alpha
 * Author: alixez <alixe.z@foxmail.com>
 * Date: 2017/8/21
 */

// 意向征集
export default function (sequelize, DataTypes) {
  return sequelize.define('Intention', {
    id: {type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true},
    title: {type: DataTypes.STRING},
    content: {type: DataTypes.STRING},
    status: {type: DataTypes.INTEGER}, // 0：未知 1：进行中 2：已终止
    vote_count: {type: DataTypes.INTEGER}, // 投票数
    user_id: {type: DataTypes.UUID},  // 发起人ID
    dept_id: {type: DataTypes.UUID}, // 发起部门ID
  }, {
    classMethods: {
      associates(models) {
        this.hasMany(models.IntentionVote, {
          as: 'votes',
          foreignKey: 'intention_id',
          sourceKey: 'id',
        });

        this.belongsTo(models.User, {
          as: 'publisher',
          foreignKey: 'user_id',
          sourceKey: 'id',
        })
      }
    }
  });
}