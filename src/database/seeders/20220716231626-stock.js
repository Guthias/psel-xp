'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('stocks', [
      {
        id: 'XPBR31',
        name: 'XP Inc',
      }, {
        id: 'AZUL4',
        name: 'Azul',
      }, {
        id: 'ABEV3',
        name: 'AMBEV',
      }, {
        id: 'ELET3',
        name: 'Eletobras',
      }, {
        id: 'MGLU3',
        name: 'Magazine Luiza',
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('stocks', null, {});
  }
};
