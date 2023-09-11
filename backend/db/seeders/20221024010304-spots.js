'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Spots', [
      {
        "ownerId": 1,
        "address": "9837 Ashley St",
        "city": "Austin",
        "state": "Texas",
        "country": "United States",
        "lat": 88.7645353,
        "lng": -122.4730359,
        "name": "Joe Rogan's House",
        "description": "Do a podcast with Joe, get a lifetime subscription to Spotify Premium!",
        "price": 305
      },
      {
        "ownerId": 2,
        "address": "3950 Camino Lindo Dr",
        "city": "San Diego",
        "state": "California",
        "country": "United States",
        "lat": 99.7245358,
        "lng": -122.4730329,
        "name": "Beach House",
        "description": "Very beautiful, great vibes.",
        "price": 502
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Spots', {
      address: { [Op.in]: ['987 Tracy', '123 Troost', '456 Vivian'] }
    }, {});
  }
};
