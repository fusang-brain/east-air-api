/**
 * By Alpha
 * Author: alixez <alixe.z@foxmail.com>
 * Date: 2017/8/26
 */

export default (sequelize, DataTypes) => sequelize.define('Vod', {
  id: {type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true},
  vod_type: {type: DataTypes.INTEGER, defaultValue: 0}, // 0: 视频 1: 音频
  category: {type: DataTypes.INTEGER, defaultValue: 0}, // 0: 分类1 ---- 4: 分类5
  aliyun_video_id: {type: DataTypes.STRING},               // 阿里云的视频ID
  cover_id: {type: DataTypes.UUID, references:{onDelete: 'cascade'}},                        // 封面文件ID
  title: {type: DataTypes.STRING},                         // 标题
  description: {type: DataTypes.TEXT},                     // 描述
  enable: {type: DataTypes.BOOLEAN},                       // 已启用
}, {
  classMethods: {
    associate(models) {

      this.belongsTo(models.File, {
        as: 'cover',
        foreignKey: 'cover_id',
        sourceKey: 'id',
        onDelete: 'cascade',
      });

      this.hasMany(models.VodPlayHistory, {
        as: 'play_history',
        foreignKey: 'vod_id',
        sourceKey: 'id',
      });

    }
  }
});