'use strict';

const bcrypt = require('bcrypt-nodejs');

module.exports = {
  up: function (queryInterface, Sequelize) {
    const schema = {
      id: {type: Sequelize.UUID, defaultValue: Sequelize.UUIDV4, primaryKey: true, allowNull: false},
      name: {type: Sequelize.STRING, length: 50},
      mobile: {type: Sequelize.STRING, length: 11, unique: true},
      nickname: {type: Sequelize.STRING, length: 50},
      password: {type: Sequelize.STRING},
      email: {type: Sequelize.STRING, defaultValue: ''},
      gender: {type: Sequelize.INTEGER, defaultValue: ''},
      province: {type: Sequelize.INTEGER, defaultValue: ''},
      city: {type: Sequelize.INTEGER},
      type: {type: Sequelize.STRING},
      state: {type: Sequelize.INTEGER},
      otherStatus: {type: Sequelize.INTEGER},
      job: {type: Sequelize.STRING},
      dept: {type: Sequelize.STRING},
      avatar: {type: Sequelize.STRING},
      birthday: Sequelize.INTEGER,
      integration: Sequelize.INTEGER,
      entryTime: Sequelize.INTEGER,
      quitTime: Sequelize.INTEGER,
      retireTime: Sequelize.INTEGER,
      username: Sequelize.STRING,
      createdAt: {
        type: Sequelize.STRING
      },
      updatedAt: {
        type: Sequelize.STRING
      }
    };
    return queryInterface
      .createTable('Users', schema)
      // .then(() => {
      //   const User = sequelize.define('User', schema, {underscored: true, timestamps: true});
      //   return User.create({
      //     name: 'root',
      //     mobile: '18627894265',
      //     nickname: 'root',
      //     password: bcrypt.bcrypt.hashSync('7C4A8D09CA3762AF61E59520943DC26494F8941B', bcrypt.genSaleSync(8), null), // 123456
      //
      //   })
      // })
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface
      .dropTable('Users');
  }
};
