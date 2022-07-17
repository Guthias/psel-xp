'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('buyorders', [
      // Gustavo Mathias
      {
        userId: 1,
        stockId: 1,
        quantity: 100,
        price: 96.24
      }, {
        userId: 1,
        stockId: 2,
        quantity: 100,
        price: 12.20
      }, {
        userId: 1,
        stockId: 3,
        quantity: 100,
        price: 13.70
      }, {
        userId: 1,
        stockId: 4,
        quantity: 100,
        price: 43.66
      }, {
        userId: 1,
        stockId: 5,
        quantity: 100,
        price: 2.78
      },
      // Ada Love
      {
        userId: 2,
        stockId: 1,
        quantity: 10,
        price: 98.05
      }, {
        userId: 2,
        stockId: 4,
        quantity: 30,
        price: 15.87
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('buyorders', null, {});
  }
};
