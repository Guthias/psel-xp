'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('buyOrders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id',
        },
      },
      stockId: {
        type: Sequelize.STRING,
        references: {
          model: 'Stocks',
          key: 'id',
        },
      },
      quantity: {
        type: Sequelize.INTEGER
      },
      price: {
        type: Sequelize.DECIMAL(10, 2)
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('buyOrders');
  }
};