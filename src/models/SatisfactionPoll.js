/**
 * By Alpha
 * Author: alixez <alixe.z@foxmail.com>
 * Date: 2017/8/23
 */

export default (sequelize, DataTypes) => sequelize.define('SatisfactionPoll', {
  id: {type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true},
  survey_id: {type: DataTypes.UUID},
  satisfaction_level: {type: DataTypes.STRING}, // 'very_satisfied': 非常满意 'satisfied': 满意 'not_satisfied': 不满意
  options: {type: DataTypes.TEXT},
  evaluate_time: {type: DataTypes.STRING},
  evaluate_person_id: {type: DataTypes.UUID},
}, {
  classMethods: {
    associate(models) {
      this.hasMany(models.SatisfactionPollTag, {
        as: 'not_satisfied_tags',
        foreignKey: 'survey_poll_id',
        sourceKey: 'id',
      });

      this.belongsTo(models.User, {
        as: 'evaluate_person',
        foreignKey: 'evaluate_person_id',
        sourceKey: 'id',
      });

    }
  }
})