const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');
const { protect, isAdmin } = require('../middlewares/authMiddleware');

router.get('/', protect, isAdmin, usuarioController.listarUsuarios);
router.get('/:id', protect, isAdmin, usuarioController.obtenerUsuario);
router.put('/:id', protect, isAdmin, usuarioController.actualizarUsuario);
router.delete('/:id', protect, isAdmin, usuarioController.eliminarUsuario);

module.exports = router;