'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Reviews', [
      {
        userId: 1,
        spotId: 1,
        "review": "sooo cooool omggg.",
        "stars": 5.0
      },
      {
        userId: 1,
        spotId: 1,
        "review": "yuck i hate it",
        "stars": 1.0
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Reviews', {
      review: { [Op.in]: ["This was a bad spot!", "This was a good spot!"] }
    }, {});
  }
};
