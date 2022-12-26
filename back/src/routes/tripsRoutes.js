const { validateUser } = require('../middlewares/authentication');
const { getAllTrips, removeTrip, createTrip, reserveTrip, getUserTrips, getAllUserTrips, approveUserTrip } = require('../controllers/tripsController');
const express = require('express');

const router = express.Router();

router.get('/', [
    validateUser,
    getAllTrips
]);
router.post('/', [
    validateUser,
    createTrip
]);
router.get('/reserves', [
    validateUser,
    getUserTrips
]);
router.get('/reserves/all', [
    validateUser,
    getAllUserTrips
]);
router.post('/reserves/approve/:requestId', [
    validateUser,
    approveUserTrip
]);
router.post('/reserves/:tripId', [
    validateUser,
    reserveTrip
]);
router.delete('/:tripId', [
    validateUser,
    removeTrip
]);

module.exports = router;