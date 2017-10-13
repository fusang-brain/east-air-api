/**
 * By Alpha
 * Author: alixez <alixe.z@foxmail.com>
 * Date: 2017/8/23
 */

export default (sequelize, DataTypes) => sequelize.define('SatisfactionSurveyImage', {
  id: {type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true},
  survey_id: {type: DataTypes.UUID},
  file_id: {type: DataTypes.UUID},
  file_path: {type: DataTypes.STRING},
  file_size: {type: DataTypes.STRING},
}, {
  classMethods: {
    associate(models) {

      this.belongsTo(models.SatisfactionSurvey, {
        as: 'survey',
        foreignKey: 'survey_id',
        sourceKey: 'id',
      });

    }
  }
})