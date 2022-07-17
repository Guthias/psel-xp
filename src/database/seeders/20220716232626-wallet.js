'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('wallets', [
      // Corretora
      {
        userId: 1,
        stockId: 1,
        quantity: 800
      }, {
        userId: 1,
        stockId: 2,
        quantity: 800
      }, {
        userId: 1,
        stockId: 3,
        quantity: 800
      }, {
        userId: 1,
        stockId: 4,
        quantity: 800
      }, {
        userId: 1,
        stockId: 5,
        quantity: 800
      },
      // Ada
      {
        userId: 2,
        stockId: 1,
        quantity: 25
      }, {
        userId: 2,
        stockId: 4,
        quantity: 50
      }, {
        userId: 2,
        stockId: 2,
        quantity: 20
      }, 
      // Alex
      {
        userId: 3,
        stockId: 3,
        quantity: 20
      }, {
        userId: 3,
        stockId: 5,
        quantity: 60
      },
      // Linus
      {
        userId: 4,
        stockId: 1,
        quantity: 50
      }, {
        userId: 4,
        stockId: 4,
        quantity: 20
      },
    ])
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('wallets', null, {});
  }
};
