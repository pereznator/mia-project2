const { validateUser } = require('../middlewares/authentication');
const express = require('express');
const { getAllCars, createCar, removeCar } = require('../controllers/carsController');

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
router.delete("/:carId",
  [
    validateUser,
    removeCar
  ]
);

module.exports = router;