/**
 * Created by alixez on 17-6-21.
 */

export default function (sequelize, DataTypes) {
  return sequelize.define('Permission', {
    id: {type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true},
    module_id: {type: DataTypes.UUID},
    module_slug: {type: DataTypes.STRING},
    name: {type: DataTypes.STRING},
    slug: {type: DataTypes.STRING},
  }, {
    classMethod: {
      associate(models) {
        this.belongsTo(models.Module, {as: 'module', foreignKey: 'module_id', sourceKey: 'id'});
        this.belongsToMany(models.Role, {
          as: 'role',
          through: {
            model: models.RolePermission,
            as: 'role_permission',
            unique: false,
          },
          foreignKey: 'permission_id',
          otherKey: 'role_id',
        })
      }
    }
  });
}
