const jwt = require('jsonwebtoken');
const Usuario = require('../models/Usuario');

exports.protect = async (req, res, next) => {
    let token;
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        token = req.headers.authorization.split(' ')[1];
    }
    if (!token) {
        return res.status(401).json({ msg: 'No token, authorization denied.' });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.usuario = await Usuario.findById(decoded.id).select('-contraseña');
        if (!req.usuario) {
            return res.status(401).json({ msg: 'User not found.' });
        }
        next();
    } catch (error) {
        res.status(401).json({ msg: 'Token is not valid.' });
    }
};

// Optional: Middleware to check admin role
exports.isAdmin = (req, res, next) => {
    if (req.usuario && req.usuario.rol === 'admin') {
        next();
    } else {
        res.status(403).json({ msg: 'Admin access required.' });
    }
};