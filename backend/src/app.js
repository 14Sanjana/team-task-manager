const router = require('express').Router();

const {
  getUsers
} = require('../controllers/userController');

const authMiddleware = require('../middleware/authMiddleware');

router.get(
  '/',
  authMiddleware,
  getUsers
);

module.exports = router;