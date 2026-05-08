const router = require('express').Router();

const {
  createTask,
  getTasks,
  updateTaskStatus
} = require('../controllers/taskController');

const authMiddleware = require('../middleware/authMiddleware');

router.post(
  '/',
  authMiddleware,
  createTask
);

router.get(
  '/',
  authMiddleware,
  getTasks
);

router.put(
  '/:id',
  authMiddleware,
  updateTaskStatus
);

module.exports = router;