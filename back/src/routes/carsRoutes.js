const { validateUser } = require('../middlewares/authentication');
const express = require('express');
const { getAllCars, createCar, removeCar, reserveCar, getUserCars, getAllActiveRequests, updateCarRequest } = require('../controllers/carsController');

const router = express.Router();


router.get("/",
  [
    validateUser,
    getAllCars
  ]
);
router.post("/",
  [
    validateUser,
    createCar
  ]
);
router.get("/reserves",
  [
    validateUser,
    getUserCars
  ]
);

router.get("/reserves/all",
  [
    validateUser,
    getAllActiveRequests
  ]
);
router.post("/reserves/approve/:requestId",
  [
    validateUser,
    updateCarRequest
  ]
);
router.post("/reserves/:liscencePlate",
  [
    validateUser,
    reserveCar
  ]
);
router.delete("/:carId",
  [
    validateUser,
    removeCar
  ]
);

module.exports = router;