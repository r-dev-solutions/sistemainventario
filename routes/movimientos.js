const express = require('express');
const router = express.Router();
const movimientoController = require('../controllers/movimientoController');
const { protect } = require('../middlewares/authMiddleware');

router.get('/', protect, movimientoController.listarMovimientos);
router.post('/', protect, movimientoController.registrarMovimiento);

module.exports = router;