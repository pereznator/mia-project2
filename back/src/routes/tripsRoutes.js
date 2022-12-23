const { validateUser } = require('../middlewares/authentication');
const { getAllTrips, removeTrip, createTrip, reserveTrip, getUserTrips } = require('../controllers/tripsController');
const express = require('express');

const router = express.Router();

router.get('/',
  [
    validateUser,
    getAllTrips
  ]
);
router.post('/',
  [
    validateUser,
    createTrip
  ]
);
router.get('/reserves',
  [
    validateUser,
    getUserTrips
  ]
);
router.post('/reserves/:tripId',
  [
    validateUser,
    reserveTrip
  ]
);
router.delete('/:tripId',
  [
    validateUser,
    removeTrip
  ]
);

module.exports = router;