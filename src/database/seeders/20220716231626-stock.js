'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('stocks', [
      {
        symbol: 'XPBR31',
        name: 'XP Inc',
      }, {
        symbol: 'AZUL4',
        name: 'Azul',
      }, {
        symbol: 'ABEV3',
        name: 'AMBEV',
      }, {
        symbol: 'ELET3',
        name: 'Eletobras',
      }, {
        symbol: 'MGLU3',
        name: 'Magazine Luiza',
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('stocks', null, {});
  }
};
