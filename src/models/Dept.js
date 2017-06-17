/**
 * Created by alixez on 17-6-15.
 */
export default function (sequelize, DataTypes) {
  const Dept = sequelize.define('Dept', {
    id: {type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true},
    tree_level: {type: DataTypes.INTEGER, defaultValue: 1},
    parent: {
      type: DataTypes.UUID,
      references: null,
    },
    dept_name: {type: DataTypes.STRING, defaultValue: ''},

    deleted: {type: DataTypes.BOOLEAN, defaultValue: false},
    create_at: {type: DataTypes.STRING, defaultValue: new Date().getTime()},
    update_at: {type: DataTypes.STRING, defaultValue: new Date().getTime()},
  }, {
    classMethods: {
      associate(models) {
        Dept.hasMany(models.Dept, {as: 'children', foreignKey: 'parent', sourceKey: 'id'});
        // Dept.belongsTo(models.Dept, {as: 'parent', foreignKey: 'parent', sourceKey: 'num_key'});
      }
    }
  });

  return Dept;
}