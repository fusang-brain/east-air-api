/**
 * Created by alixez on 17-6-12.
 */

export default function (sequelize, DataTypes) {
  return sequelize.define('UserLoginInfo', {
    id: {type: DataTypes.UUID, defaultValue: sequelize.UUIDV4, primaryKey: true},
    client_ip: {type: DataTypes.STRING, defaultValue: ''},
    login_ways: {type: DataTypes.STRING, defaultValue: 'PC'},
    login_time: {type: DataTypes.STRING, defaultValue: sequelize.NOW},
    flag: {type: DataTypes.STRING, defaultValue: ''},
    status: {type: DataTypes.STRING, defaultValue: ''},

    deleted: {type: DataTypes.BOOLEAN, defaultValue: false},
    create_at: {type: DataTypes.STRING, defaultValue: new Date().getTime()},
    update_at: {type: DataTypes.STRING, defaultValue: new Date().getTime()},
  });
};