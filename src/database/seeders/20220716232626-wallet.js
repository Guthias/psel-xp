'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('wallets', [
      // Corretora
      {
        userId: 1,
        stockId: 'XPBR31',
        quantity: 800
      }, {
        userId: 1,
        stockId: 'AZUL4',
        quantity: 800
      }, {
        userId: 1,
        stockId: 'ABEV3',
        quantity: 800
      }, {
        userId: 1,
        stockId: 'ELET3',
        quantity: 800
      }, {
        userId: 1,
        stockId: 'MGLU3',
        quantity: 800
      },
      // Ada
      {
        userId: 2,
        stockId: 'XPBR31',
        quantity: 25
      }, {
        userId: 2,
        stockId: 'ELET3',
        quantity: 50
      }, {
        userId: 2,
        stockId: 'AZUL4',
        quantity: 20
      }, 
      // Alex
      {
        userId: 3,
        stockId: 'ABEV3',
        quantity: 20
      }, {
        userId: 3,
        stockId: 'MGLU3',
        quantity: 60
      },
      // Linus
      {
        userId: 4,
        stockId: 'XPBR31',
        quantity: 50
      }, {
        userId: 4,
        stockId: 'ELET3',
        quantity: 20
      },
    ])
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('wallets', null, {});
  }
};
