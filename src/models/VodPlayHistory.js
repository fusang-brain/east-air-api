/**
 * By Alpha
 * Author: alixez <alixe.z@foxmail.com>
 * Date: 2017/8/26
 */

export default (sequelize, DataTypes) => sequelize.define('VodPlayHistory', {
  id: {type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true},
  vod_id: {type: DataTypes.UUID}, // 关联的点播文件ID,
  user_id: {type: DataTypes.UUID, references:{onDelete: 'cascade'}}, // 关联的用户ID,
  last_play_seed: {type: DataTypes.STRING}, // 上次播放的进度
  max_play_seed: {type: DataTypes.STRING},  // 最大的播放进度
  is_finished: {type: DataTypes.BOOLEAN, defaultValue: false}, // 是否完成
  duration: {type: DataTypes.STRING, defaultValue: '0'},
  update_time: {type: DataTypes.STRING, defaultValue: Date.now},
}, {
  classMethods: {
    associate(models) {
      this.belongsTo(models.User, {
        as: 'user',
        foreignKey: 'user_id',
        sourceKey: 'id',
        onDelete: 'cascade',
      });

      this.belongsTo(models.Vod, {
        as: 'vod_file_info',
        foreignKey: 'vod_id',
        sourceKey: 'id',
        onDelete: 'cascade',
      });
    }
  }
});