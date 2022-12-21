const express = require('express');
const { getUsers } = require('../controllers/touristController');

const router = express.Router();

router.get('/', 
  [
    getUsers
  ]
);

module.exports = router;