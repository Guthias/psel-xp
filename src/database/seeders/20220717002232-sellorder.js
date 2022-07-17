'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('sellorders', [
      // Gustavo Mathias
      {
        userId: 1,
        stockId: 'XPBR31',
        quantity: 200,
        price: 98.35
      }, {
        userId: 1,
        stockId: 'AZUL4',
        quantity: 200,
        price: 97.22
      }, {
        userId: 1,
        stockId: 'ABEV3',
        quantity: 200,
        price: 18.70
      }, {
        userId: 1,
        stockId: 'ELET3',
        quantity: 200,
        price: 44.20
      }, {
        userId: 1,
        stockId: 'MGLU3',
        quantity: 200,
        price: 3.04
      },

      // Linus
      {
        userId: 4,
        stockId: 'XPBR31',
        quantity: 20,
        price: 98.08
      }, {
        userId: 4,
        stockId: 'ELET3',
        quantity: 15,
        price: 45.08
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('sellorders', null, {});
  }
};
