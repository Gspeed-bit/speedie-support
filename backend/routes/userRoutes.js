const express = require('express');
const {
  registerUser,
  loginUser,
  getMe,
} = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();



router.post('/', registerUser);
router.post('/login', loginUser);

// to protect any route you just have to insert the protect inside the router
router.get('/me',protect, getMe);

module.exports = router; 