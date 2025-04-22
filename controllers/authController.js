const Usuario = require('../models/Usuario');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Register a new user (admin only)
exports.register = async (req, res) => {
    try {
        const { nombre, correo, contraseña, rol } = req.body;
        const existeUsuario = await Usuario.findOne({ correo });
        if (existeUsuario) {
            return res.status(400).json({ msg: 'El correo ya está registrado.' });
        }
        const usuario = new Usuario({ nombre, correo, contraseña, rol });
        await usuario.save();
        res.status(201).json({ msg: 'Usuario registrado correctamente.' });
    } catch (error) {
        res.status(500).json({ msg: 'Error al registrar usuario.', error: error.message });
    }
};

// Login
exports.login = async (req, res) => {
    try {
        const { correo, contraseña } = req.body;
        const usuario = await Usuario.findOne({ correo });
        if (!usuario) {
            return res.status(400).json({ msg: 'Credenciales inválidas.' });
        }
        const esValido = await bcrypt.compare(contraseña, usuario.contraseña);
        if (!esValido) {
            return res.status(400).json({ msg: 'Credenciales inválidas.' });
        }
        const token = jwt.sign(
            { id: usuario._id, rol: usuario.rol },
            process.env.JWT_SECRET,
            { expiresIn: '8h' }
        );
        res.json({ token });
    } catch (error) {
        res.status(500).json({ msg: 'Error al iniciar sesión.', error: error.message });
    }
};

// Get authenticated user info
exports.getMe = async (req, res) => {
    try {
        const usuario = await Usuario.findById(req.usuario.id).select('-contraseña');
        res.json(usuario);
    } catch (error) {
        res.status(500).json({ msg: 'Error al obtener usuario.', error: error.message });
    }
};