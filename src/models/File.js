/**
 * Created by alixez on 17-7-28.
 */

export default function (sequelize, DataTypes) {
  return sequelize.define('File', {
    id: {type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true},
    abs_path: {type: DataTypes.STRING},
    path: {type: DataTypes.STRING},
    size: {type: DataTypes.INTEGER},
    mimetype: {type: DataTypes.STRING},
    filename: {type: DataTypes.STRING},
  });
}