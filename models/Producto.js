const mongoose = require('mongoose');

const HistorialCambioSchema = new mongoose.Schema({
    fecha: { type: Date, default: Date.now },
    usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario' },
    tipo_cambio: { type: String }
}, { _id: false });

const ProductoSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    descripcion: { type: String },
    categoria: { type: String, required: true },
    sku: { type: String, unique: true },
    cantidad: { type: Number, default: 0 },
    unidad: { type: String },
    precio_compra: { type: Number },
    precio_venta: { type: Number },
    proveedor: { type: String },
    correo_proveedor: { type: String },
    tel_proveedor: { type: String },
    fecha_ingreso: { type: Date, default: Date.now },
    fecha_actualización: { type: Date },
    ubicación: { type: String },
    stock_mínimo: { type: Number },
    stock_máximo: { type: Number },
    imagen_url: { type: String },
    activo: { type: Boolean, default: true },
    notas: { type: String },
    creado_por: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario' },
    actualizado_por: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario' },
    historial_cambios: [HistorialCambioSchema],
    etiquetas: [{ type: String }]
});

module.exports = mongoose.model('Producto', ProductoSchema);