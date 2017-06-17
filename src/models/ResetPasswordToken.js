/**
 * Created by alixez on 17-6-17.
 */
export default function (sequelize, DataTypes) {
  return sequelize.define('ResetPasswordToken', {
    id: {type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true},
    user: {type: DataTypes.UUID},
    token: {type: DataTypes.STRING},
    expired_at: {type: DataTypes.STRING},
    deleted: {type: DataTypes.BOOLEAN, defaultValue: false},
    create_at: {type: DataTypes.STRING, defaultValue: new Date().getTime()},
    update_at: {type: DataTypes.STRING, defaultValue: new Date().getTime()},
  })
}