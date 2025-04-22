const Auditoria = require('../models/Auditoria');
const Usuario = require('../models/Usuario');

exports.listarAuditoria = async (req, res) => {
    try {
        const { usuario, accion, entidad, fechaInicio, fechaFin, page = 1, limit = 20 } = req.query;
        const query = {};

        if (usuario) query.usuario = usuario;
        if (accion) query.accion = accion;
        if (entidad) query.entidad = entidad;
        if (fechaInicio || fechaFin) {
            query.fecha = {};
            if (fechaInicio) query.fecha.$gte = new Date(fechaInicio);
            if (fechaFin) query.fecha.$lte = new Date(fechaFin);
        }

        const auditorias = await Auditoria.find(query)
            .populate('usuario', 'nombre correo')
            .skip((page - 1) * limit)
            .limit(Number(limit))
            .sort({ fecha: -1 });

        const total = await Auditoria.countDocuments(query);

        res.json({ total, page: Number(page), limit: Number(limit), auditorias });
    } catch (error) {
        res.status(500).json({ msg: 'Error listing audit logs', error: error.message });
    }
};