const mongoose = require('mongoose');

const AuditoriaSchema = new mongoose.Schema({
    usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true },
    accion: { type: String, required: true }, // e.g., 'crear_producto', 'editar_usuario'
    entidad: { type: String, required: true }, // e.g., 'producto', 'usuario', 'movimiento'
    entidadId: { type: mongoose.Schema.Types.ObjectId, required: true },
    detalle: { type: Object }, // Optional: store changes or extra info
    fecha: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Auditoria', AuditoriaSchema);