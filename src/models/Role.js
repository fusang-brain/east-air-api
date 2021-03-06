/**
 * Created by alixez on 17-6-15.
 */

import {generateSlug} from '../utils/utils';

export default function (sequelize, DataTypes) {
  const schema = sequelize.define('Role', {
    id: {type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true},
    role_name: {type: DataTypes.STRING, defaultValue: ''},
    role_description: {type: DataTypes.STRING, defaultValue: '无'},
    role_slug: {type: DataTypes.STRING, defaultValue: generateSlug, unique: true},
    deleted: {type: DataTypes.BOOLEAN, defaultValue: false},
    available: {type: DataTypes.BOOLEAN, defaultValue: true},
    create_at: {type: DataTypes.STRING, defaultValue: new Date().getTime()},
    update_at: {type: DataTypes.STRING, defaultValue: new Date().getTime()},
  }, {
    defaultScope: {
      where: {
        deleted: false,
      },
      attributes: {
        exclude: ['create_at', 'update_at'],
      }
    },

    classMethods: {
      associate(models) {
        this.hasMany(models.User, {
          as: 'members',
          foreignKey: 'role',
          sourceKey: 'id',
        });
        this.belongsToMany(models.Permission, {
          as: 'permissions',
          through: {
            model: models.RolePermission,
            as: 'role_permission',
            unique: false,
          },
          foreignKey: 'role_id',
          otherKey: 'permission_id',
        });
        // this.hasMany(models.RolePermission, {as: 'permissions', foreignKey: 'role_id', sourceKey: 'id'});
      }
    }
  });

  return schema;
}

