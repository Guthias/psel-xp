'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('sellorders', [
      // Gustavo Mathias
      {
        userId: 1,
        stockId: 1,
        quantity: 200,
        price: 98.35
      }, {
        userId: 1,
        stockId: 2,
        quantity: 200,
        price: 97.22
      }, {
        userId: 1,
        stockId: 3,
        quantity: 200,
        price: 18.70
      }, {
        userId: 1,
        stockId: 4,
        quantity: 200,
        price: 44.20
      }, {
        userId: 1,
        stockId: 5,
        quantity: 200,
        price: 3.04
      },

      // Linus
      {
        userId: 4,
        stockId: 1,
        quantity: 20,
        price: 98.08
      }, {
        userId: 4,
        stockId: 4,
        quantity: 15,
        price: 45.08
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('sellorders', null, {});
  }
};
