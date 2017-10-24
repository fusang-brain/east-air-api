/**
 * By Alpha
 * Author: alixez <alixe.z@foxmail.com>
 * Date: 2017/8/22
 */

export default (sequelize, DataTypes) => sequelize.define('SatisfactionSurvey', {
  id: {type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true},
  survey_type: {type: DataTypes.INTEGER},    // 调查类型 0: 人  1: 物
  survey_subject: {type: DataTypes.STRING},  // 调查主题

  survey_user_id: {type: DataTypes.UUID, references:{onDelete: 'cascade'}}, // 被调查人ID
  is_system_survey: {type: DataTypes.BOOLEAN, defaultValue: false}, // 是否是系统调查 若不是系统调查则为自定义调查
  create_time: {type: DataTypes.STRING, defaultValue: Date.now}, // 创建时间
  state: {type: DataTypes.INTEGER},  // 0：已停止 1：投票中
  user_id: {type: DataTypes.UUID, references:{onDelete: 'cascade'}}, // 发起人ID

}, {
  classMethods: {
    associate(models) {
      // this.belongsTo(models.User, {
      //   as: 'survey_user',
      //   foreignKey: 'survey_subject',
      //   sourceKey: 'id',
      // });

      // this.hasOne(models.SatisfactionSurveyImage, {
      //   as: 'satisfaction_image',
      //   foreignKey: 'satisfaction_id',
      //   sourceKey: 'id',
      // });

      this.hasOne(models.SatisfactionSurveyImage, {
        as: 'satisfaction_image',
        foreignKey: 'survey_id',
        sourceKey: 'id',
      });

      this.belongsTo(models.User, {
        as: 'survey_user',
        foreignKey: 'survey_user_id',
        sourceKey: 'id',
      });

      this.belongsTo(models.User, {
        as: 'publisher',
        foreignKey: 'user_id',
        sourceKey: 'id',
      });
    }
  }
});