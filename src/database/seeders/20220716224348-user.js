'use strict';
const bcrypt = require('bcrypt');

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('users', [
      {
        email: 'admin@xpinc.com',
        name: 'Corretora XP Inc',
        password: bcrypt.hashSync('12345678', 10),
        balance: 1000000,
      }, {
        email: 'ada@teste.com',
        name: 'Ada Lovelace',
        password: bcrypt.hashSync('12345678', 10),
        balance: 8000,
      }, {
        email: 'alan@teste.com',
        name: 'Alan Turing',
        password: bcrypt.hashSync('12345678', 10),
        balance: 6800.23,
      }, {
        email: 'linus@teste.com',
        name: 'Linus Torvald',
        password: bcrypt.hashSync('12345678', 10),
        balance: 7000,
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
  }
};
