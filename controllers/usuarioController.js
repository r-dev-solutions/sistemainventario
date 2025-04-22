const Usuario = require('../models/Usuario');

// List all users (admin only)
exports.listarUsuarios = async (req, res) => {
    try {
        const usuarios = await Usuario.find().select('-contraseña');
        res.json(usuarios);
    } catch (error) {
        res.status(500).json({ msg: 'Error listing users', error: error.message });
    }
};

// Get user by ID (admin only)
exports.obtenerUsuario = async (req, res) => {
    try {
        const usuario = await Usuario.findById(req.params.id).select('-contraseña');
        if (!usuario) return res.status(404).json({ msg: 'User not found' });
        res.json(usuario);
    } catch (error) {
        res.status(500).json({ msg: 'Error getting user', error: error.message });
    }
};

// Update user (admin only)
exports.actualizarUsuario = async (req, res) => {
    try {
        const usuario = await Usuario.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        ).select('-contraseña');
        if (!usuario) return res.status(404).json({ msg: 'User not found' });
        res.json(usuario);
    } catch (error) {
        res.status(500).json({ msg: 'Error updating user', error: error.message });
    }
};

// Delete user (admin only)
exports.eliminarUsuario = async (req, res) => {
    try {
        const usuario = await Usuario.findByIdAndDelete(req.params.id);
        if (!usuario) return res.status(404).json({ msg: 'User not found' });
        res.json({ msg: 'User deleted' });
    } catch (error) {
        res.status(500).json({ msg: 'Error deleting user', error: error.message });
    }
};