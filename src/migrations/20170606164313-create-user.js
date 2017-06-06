'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface
      .createTable('Users', {
        id: {
          type: Sequelize.STRING,
          primaryKey: true,
          allowNull: false,
          defaultValue: Sequelize.UUID
        },
        username: Sequelize.STRING,
        createdAt: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.NOW,
        },
        updatedAt: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.NOW,
        }
      })
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface
      .dropTable('Users');
  }
};
