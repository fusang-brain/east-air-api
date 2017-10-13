/**
 * Created by alixez on 17-7-28.
 */

export default function (sequelize, DataTypes) {
  return sequelize.define('File', {
    id: {type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true},
    abs_path: {type: DataTypes.STRING},          // 文件绝对路径
    path: {type: DataTypes.STRING},              // 文件web路径
    size: {type: DataTypes.INTEGER},             // 文件大小
    mimetype: {type: DataTypes.STRING},          // 文件mimetype
    filename: {type: DataTypes.STRING},          // 文件名
    origin_filename: {type: DataTypes.STRING},   // 文件原始名
  });
}