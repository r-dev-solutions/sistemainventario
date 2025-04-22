const express = require('express');
const router = express.Router();
const auditoriaController = require('../controllers/auditoriaController');
const { protect, isAdmin } = require('../middlewares/authMiddleware');

router.get('/', protect, isAdmin, auditoriaController.listarAuditoria);

module.exports = router;