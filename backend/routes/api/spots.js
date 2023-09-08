// const express = require('express');
// const { Spot } = require('../../db/models');

// const router = express.Router();

// router.get('/', async (req, res) => {
//   try {
//     const spots = await Spot.findAll();
    
//     return res.json({ Spots: spots });
//   } catch (error) {
//     console.error('Error fetching spots:', error);
//     return res.status(500).json({ message: 'Internal server error' });
//   }
// });

// module.exports = router;


const express = require('express');
const { requireAuth } = require('../../utils/auth');
const { Spot } = require('../../db/models');

const router = express.Router();

router.get('/current', requireAuth, async (req, res) => {
  try {
    const userId = req.user.id; 

    const spots = await Spot.findAll({
      where: {
        ownerId: userId,
      },
    });

    res.json({ Spots: spots });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;