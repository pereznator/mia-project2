const express = require('express');
const { getUsers } = require('../controllers/adminController');

const router = express.Router();

router.get('/', 
  [
    getUsers
  ]
);

module.exports = router;