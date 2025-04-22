const mongoose = require('mongoose');

const ProveedorSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    contacto: {
        nombre: String,
        email: String,
        telefono: String,
        direccion: String
    },
    historial_abastecimiento: [
        {
            producto: { type: mongoose.Schema.Types.ObjectId, ref: 'Producto' },
            fecha: Date,
            cantidad: Number
        }
    ],
    condiciones_compra: String,
    activo: { type: Boolean, default: true }
});

module.exports = mongoose.model('Proveedor', ProveedorSchema);