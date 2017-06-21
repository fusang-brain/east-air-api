/**
 * Created by alixez on 17-6-21.
 */


// 功能模块 Model
export default function (sequelize, DataTypes) {
  return sequelize.define('Module', {
    id: {type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true},
    name: {type: DataTypes.STRING},
    slug: {type: DataTypes.STRING},
  }, {
    classMethods: {
      associate(models) {
        this.hasMany(models.Permission, {as: 'permission', foreignKey: 'module_id', sourceKey: 'id'});
      }
    }
  });
}
