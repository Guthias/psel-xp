'use strict';

const { PrimaryKey } = require("sequelize-typescript");

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Wallets', {
      userId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id',
        },
        primaryKey: true,
      },
      stockId: {
        allowNull: false,
        type: Sequelize.STRING,
        references: {
          model: 'Stocks',
          key: 'id',
        },
        primaryKey: true,
      },
      quantity: {
        allowNull: false,
        type: Sequelize.INTEGER
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Wallets');
  }
};