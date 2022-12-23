const { validateUser } = require('../middlewares/authentication');
const { getAllTrips, removeTrip, createTrip } = require('../controllers/tripsController');
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
router.delete('/:tripId',
  [
    validateUser,
    removeTrip
  ]
);

module.exports = router;