/**
 * Created by alixez on 17-8-9.
 */


export default function (sequelize, DataTypes) {
  return sequelize.define('DownloadToken', {
    token: {type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true},
    user_id: {type: DataTypes.UUID},
    used: {type: DataTypes.BOOLEAN, defaultValue: false},
    expired_at: {type: DataTypes.STRING},
  });
}