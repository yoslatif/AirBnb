'use strict';

const { User } = require('../models');
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
    try {
      await User.bulkCreate([
        {
          firstName: 'demo',
          lastName: 'lition',
          email: 'demo@user.io',
          username: 'Demo-lition',
          hashedPassword: bcrypt.hashSync('password', 10)
        },
        {
          firstName: 'fake',
          lastName: 'usa',
          email: 'user1@user.io',
          username: 'FakeUser1',
          hashedPassword: bcrypt.hashSync('password2', 10)
        },
        {
          firstName: 'fakak',
          lastName: 'coco',
          email: 'user2@user.io',
          username: 'FakeUser2',
          hashedPassword: bcrypt.hashSync('password3', 10)
        }
      ], { validate: true });
    } catch (error) {
      console.error("Error seeding users: ", error);
      throw error;
  }
},

async down (queryInterface, Sequelize) {
    options.tableName = 'Users';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      username: { [Op.in]: ['Demo-lition', 'FakeUser1', 'FakeUser2'] }
    }, {});
  }
};