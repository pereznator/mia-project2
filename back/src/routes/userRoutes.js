const express = require('express');
const { getUser, getAllUsers, removeUser, createUser, updateUser } = require('../controllers/userController');
const { validateUser } = require('../middlewares/authentication');

const router = express.Router();

router.get('/', 
[
  validateUser,
  getAllUsers
]
);

router.post('/', 
[
  validateUser,
  createUser
]
);
router.post('/:id', 
[
  validateUser,
  updateUser
]
);

router.get('/:id', 
  [
    validateUser,
    getUser
  ]
);

router.delete('/:id', 
  [
    validateUser,
    removeUser
  ]
);

module.exports = router;