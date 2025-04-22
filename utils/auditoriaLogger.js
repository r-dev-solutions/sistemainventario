const Auditoria = require('../models/Auditoria');

async function logAuditoria({ usuario, accion, entidad, entidadId, detalle }) {
    try {
        await Auditoria.create({
            usuario,
            accion,
            entidad,
            entidadId,
            detalle
        });
    } catch (error) {
        // Optionally log error to a file or monitoring system
        console.error('Error logging audit:', error.message);
    }
}

module.exports = logAuditoria;