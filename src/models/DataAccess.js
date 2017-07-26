/**
 * Created by alixez on 17-7-25.
 */

export default function (sequelize, DataTypes) {
  return sequelize.define('DataAccess', {
    user_id: {type: DataTypes.UUID, primaryKey: true},
    dept_id: {type: DataTypes.UUID, primaryKey: true},
  });
}