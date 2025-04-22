const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');
const { protect, isAdmin } = require('../middlewares/authMiddleware');

router.get('/resumen', protect, isAdmin, dashboardController.resumen);

module.exports = router;