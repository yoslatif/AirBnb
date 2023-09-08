const { User, Spot } = require('./backend/db/models');

async function logData() {
  try {
    const users = await User.findAll();
    const spots = await Spot.findAll();

    console.log('Users:', JSON.stringify(users, null, 2));
    console.log('Spots:', JSON.stringify(spots, null, 2));
  } catch (error) {
    console.error('Error querying data:', error);
  }
}

logData();
