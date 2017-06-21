/**
 * Created by alixez on 17-6-21.
 */



export default function (sequelize, DataTypes) {
  return sequelize.define('RolePermission', {
    id: {type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true},
    role_id: {type: DataTypes.UUID},
    permission_id: {type: DataTypes.UUID},
    platform: {type: DataTypes.STRING}, // 'web' web平台的权限, 'app' 移动端的权限
  });
}
