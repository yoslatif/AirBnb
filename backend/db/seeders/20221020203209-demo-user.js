'use strict';
const bcrypt = require("bcryptjs");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const currentDate = new Date();
    return queryInterface.bulkInsert('Users', [
      {
        email: 'user1@bnb.io',
        username: 'Demo-lition',
        firstName: "Joey",
        lastName: "Bragg",
        hashedPassword: bcrypt.hashSync('password'),
        createdAt: currentDate,
        updatedAt: currentDate,
      },
      {
        email: 'west@west.io',
        username: 'FakeUser1',
        firstName: "Kanye",
        lastName: "East",
        hashedPassword: bcrypt.hashSync('password2'),
        createdAt: currentDate,
        updatedAt: currentDate,
      },
      {
        email: 'east@east.io',
        username: 'FakeUser2',
        firstName: "Wayne",
        lastName: "Brady",
        hashedPassword: bcrypt.hashSync('password2'),
        createdAt: currentDate,
        updatedAt: currentDate,
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Users', {
      username: { [Op.in]: ['Demo-lition', 'FakeUser1', 'FakeUser2'] }
    }, {});
  }
};
