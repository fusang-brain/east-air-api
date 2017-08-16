/**
 * By Alpha
 * Author: alixez <alixe.z@foxmail.com>
 * Date: 2017/8/16
 */

// 公文附件表
export default function (sequelize, DataTypes) {
  return sequelize.define('DocAttach', {
    id: {type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true},
    doc_id: {type: DataTypes.STRING},
    file_path: {type: DataTypes.STRING},
    file_size: {type: DataTypes.STRING},
  });
}