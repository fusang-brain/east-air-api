/**
 * By Alpha
 * Author: alixez <alixe.z@foxmail.com>
 * Date: 2017/8/16
 */

// 公文表
export default function (sequelize, DataTypes) {
  return sequelize.define('Docs', {
    id: {type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true},
    doc_title: {type: DataTypes.STRING},
    doc_type: {type: DataTypes.STRING},
    doc_level: {type: DataTypes.STRING},
    doc_note: {type: DataTypes.STRING},
    create_time: {type: DataTypes.STRING, defaultValue: Date.now},
  });
}