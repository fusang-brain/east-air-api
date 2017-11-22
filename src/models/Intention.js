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
    vote_count: {type: DataTypes.INTEGER, defaultValue: '0'}, // 投票数
    user_id: {type: DataTypes.UUID},  // 发起人ID
    dept_id: {type: DataTypes.UUID}, // 发起部门ID
    is_hidden: {type: DataTypes.BOOLEAN, defaultValue: false}, // 隐藏
    create_time: {type: DataTypes.STRING, defaultValue: Date.now}
  }, {
    classMethods: {
      associate(models) {
        this.hasMany(models.IntentionVote, {
          as: 'votes',
          foreignKey: 'intention_id',
          sourceKey: 'id',
          onDelete: 'cascade',
        });

        this.belongsTo(models.User, {
          as: 'publisher',
          foreignKey: 'user_id',
          sourceKey: 'id',
          onDelete: 'cascade',
        })
      }
    }
  });
}