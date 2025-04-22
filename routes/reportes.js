const express = require('express');
const router = express.Router();
const reportesController = require('../controllers/reportesController');
const { protect, isAdmin } = require('../middlewares/authMiddleware');

router.get('/bajo-stock', protect, reportesController.productosBajoStock);
router.get('/sin-movimiento', protect, reportesController.productosSinMovimiento);
router.get('/proximos-a-vencer', protect, reportesController.productosProximosAVencer);

module.exports = router;