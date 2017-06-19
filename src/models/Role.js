/**
 * Created by alixez on 17-6-15.
 */
export default function (sequelize, DataTypes) {
  return sequelize.define('Role', {
    id: {type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true},
    role_name: {type: DataTypes.STRING, defaultValue: ''},
    role_description: {type: DataTypes.STRING, defaultValue: '无'},

    deleted: {type: DataTypes.BOOLEAN, defaultValue: false},
    create_at: {type: DataTypes.STRING, defaultValue: new Date().getTime()},
    update_at: {type: DataTypes.STRING, defaultValue: new Date().getTime()},
  })
}
