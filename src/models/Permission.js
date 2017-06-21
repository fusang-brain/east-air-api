/**
 * Created by alixez on 17-6-21.
 */

export default function (sequelize, DataTypes) {
  return sequelize.define('Permission', {
    id: {type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true},
    module_id: {type: DataTypes.UUID},
    name: {type: DataTypes.STRING},
    slug: {type: DataTypes.STRING},
  }, {
    classMethod: {
      associate(models) {
        this.belongsTo(models.Module, {as: 'module', foreignKey: 'module_id', sourceKey: 'id'});
      }
    }
  });
}
