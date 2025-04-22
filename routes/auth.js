const express = require('express');
const router = express.Router();
const { register, login, getMe } = require('../controllers/authController');
const { protect, isAdmin } = require('../middlewares/authMiddleware');

router.post('/register', protect, isAdmin, register); // Only admin can register new users
router.post('/login', login);
router.get('/me', protect, getMe);

module.exports = router;