const express = require('express');
const router = express.Router();
const productoController = require('../controllers/productoController');
const { protect, isAdmin } = require('../middlewares/authMiddleware');

router.get('/', protect, productoController.listarProductos);
router.get('/:id', protect, productoController.obtenerProducto);
router.post('/', protect, productoController.crearProducto);
router.put('/:id', protect, productoController.actualizarProducto);
router.delete('/:id', protect, isAdmin, productoController.eliminarProducto);

module.exports = router;