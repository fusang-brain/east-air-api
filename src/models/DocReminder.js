/**
 * By Alpha
 * Author: alixez <alixe.z@foxmail.com>
 * Date: 2017/8/22
 */

export default (sequelize, DataTypes) => sequelize.define('DocReminder', {
  id: {type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true},
  doc_id: {type: DataTypes.UUID}, // 公文ID
  last_remind_time: {type: DataTypes.STRING, defaultValue: Date.now},
});