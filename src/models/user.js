/**
 * Created by alixez on 17-6-6.
 */

export default function (sequelize, DateTypes) {
  const User = sequelize.define('User', {
    username: DataTypes.STRING,
  }, {
    // classMethods: {
    //   associate(models) {
    //     User.hasMany(models.Task)
    //   }
    // }
  });

  return User;
}