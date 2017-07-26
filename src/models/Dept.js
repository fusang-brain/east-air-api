/**
 * Created by alixez on 17-6-15.
 */

export default function (sequelize, DataTypes) {
  return sequelize.define('Dept', {
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
    defaultScope: {
      attributes: {
        exclude: ['deleted', 'update_at', 'create_at']
      },
    },
    scopes: {
      list: {
        where: {
          deleted: false,
        },
        attributes: {
          exclude: ['deleted', 'update_at', 'create_at']
        },
      }
    },
    classMethods: {
      associate(models) {
        this.hasMany(models.Dept, {as: 'children', foreignKey: 'parent', sourceKey: 'id'});
        this.hasMany(models.User, {as: 'members', foreignKey: 'dept', sourceKey: 'id'});
        // Dept.belongsTo(models.Dept, {as: 'parent', foreignKey: 'parent', sourceKey: 'id'});
        this.belongsToMany(models.User, {
          as: 'access_to_members',
          through: {
            model: models.User,
            as: 'user_data_access',
            unique: false,
          },
          foreignKey: 'dept_id',
          otherKey: 'user_id',
        });
      }
    }
  });
}