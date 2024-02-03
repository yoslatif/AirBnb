// 'use strict';

// /** @type {import('sequelize-cli').Migration} */
// module.exports = {
//   up: async (queryInterface, Sequelize) => {
//     return queryInterface.bulkInsert('Reviews', [

//     ], {});
//   },

//   down: async (queryInterface, Sequelize) => {
//     const Op = Sequelize.Op;
//     return queryInterface.bulkDelete('Reviews', {
//       review: { [Op.in]: ["This was a bad spot!", "This was a good spot!"] }
//     }, {});
//   }
// };


'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Reviews', [
      {
        review: "This was a fantastic spot!",
        stars: 5,
        userId: 1, // Replace with a valid userId from your Users table
        spotId: 1, // Replace with a valid spotId from your Spots table
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        review: "Not what I expected, but okay.",
        stars: 3,
        userId: 2, // Adjust according to your schema and existing data
        spotId: 2, // Adjust according to your schema and existing data
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // Add more entries as needed
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Reviews', {
      review: { [Op.in]: ["This was a fantastic spot!", "Not what I expected, but okay."] }
    }, {});
  }
};
