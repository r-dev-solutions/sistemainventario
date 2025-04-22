const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UsuarioSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    correo: { type: String, required: true, unique: true },
    contraseña: { type: String, required: true },
    rol: { type: String, enum: ['admin', 'operador'], default: 'operador' },
    activo: { type: Boolean, default: true }
});

// Hash password before saving
UsuarioSchema.pre('save', async function(next) {
    if (!this.isModified('contraseña')) return next();
    this.contraseña = await bcrypt.hash(this.contraseña, 10);
    next();
});

module.exports = mongoose.model('Usuario', UsuarioSchema);