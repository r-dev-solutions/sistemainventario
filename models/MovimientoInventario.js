const mongoose = require('mongoose');

const MovimientoInventarioSchema = new mongoose.Schema({
    producto: { type: mongoose.Schema.Types.ObjectId, ref: 'Producto', required: true },
    tipo: { type: String, enum: ['entrada', 'salida'], required: true },
    cantidad: { type: Number, required: true },
    fecha: { type: Date, default: Date.now },
    realizado_por: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true },
    observaciones: { type: String }
});

module.exports = mongoose.model('MovimientoInventario', MovimientoInventarioSchema);