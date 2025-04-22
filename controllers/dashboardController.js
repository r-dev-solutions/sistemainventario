const Producto = require('../models/Producto');
const Movimiento = require('../models/MovimientoInventario');
const Usuario = require('../models/Usuario');

exports.resumen = async (req, res) => {
    try {
        const [
            totalProductos,
            productosCriticos,
            movimientosHoy,
            usuariosActivos
        ] = await Promise.all([
            Producto.countDocuments({ activo: true }),
            Producto.countDocuments({ cantidad: { $lte: 5 }, activo: true }),
            Movimiento.countDocuments({
                fecha: {
                    $gte: new Date(new Date().setHours(0, 0, 0, 0)),
                    $lte: new Date(new Date().setHours(23, 59, 59, 999))
                }
            }),
            Usuario.countDocuments({ activo: true })
        ]);

        res.json({
            totalProductos,
            productosCriticos,
            movimientosHoy,
            usuariosActivos
        });
    } catch (error) {
        res.status(500).json({ msg: 'Error fetching dashboard summary', error: error.message });
    }
};