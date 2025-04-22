const express = require('express');
const router = express.Router();
const proveedorController = require('../controllers/proveedorController');
const { protect, isAdmin } = require('../middlewares/authMiddleware');

router.get('/', protect, proveedorController.listarProveedores);
router.post('/', protect, isAdmin, proveedorController.crearProveedor);
router.put('/:id', protect, isAdmin, proveedorController.actualizarProveedor);
router.delete('/:id', protect, isAdmin, proveedorController.eliminarProveedor);

module.exports = router;