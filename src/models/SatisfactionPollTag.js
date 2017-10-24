/**
 * By Alpha
 * Author: alixez <alixe.z@foxmail.com>
 * Date: 2017/8/23
 */

export default (sequelize, DataTypes) => sequelize.define('SatisfactionPollTag', {
  id: {type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true},
  survey_poll_id: {type: DataTypes.UUID, references:{onDelete: 'cascade'}},
  tag: {type: DataTypes.STRING},
});