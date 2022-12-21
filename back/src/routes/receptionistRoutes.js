const express = require('express');
const { getUsers } = require('../controllers/receptionistController');

const router = express.Router();

router.get("/users",
  getUsers
);

module.exports = router;