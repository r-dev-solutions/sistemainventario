const MovimientoInventario = require('../models/MovimientoInventario');
const Producto = require('../models/Producto');

// List all inventory movements
exports.listarMovimientos = async (req, res) => {
    try {
        const movimientos = await MovimientoInventario.find()
            .populate('producto', 'nombre sku')
            .populate('realizado_por', 'nombre correo');
        res.json(movimientos);
    } catch (error) {
        res.status(500).json({ msg: 'Error listing movements', error: error.message });
    }
};

// Register a new inventory movement (entrada/salida)
exports.registrarMovimiento = async (req, res) => {
    try {
        const { producto, tipo, cantidad, observaciones } = req.body;
        const prod = await Producto.findById(producto);
        if (!prod) return res.status(404).json({ msg: 'Product not found' });

        // Update product quantity
        if (tipo === 'entrada') {
            prod.cantidad += cantidad;
        } else if (tipo === 'salida') {
            if (prod.cantidad < cantidad) {
                return res.status(400).json({ msg: 'Not enough stock for salida' });
            }
            prod.cantidad -= cantidad;
        } else {
            return res.status(400).json({ msg: 'Invalid movement type' });
        }

        // Save movement
        const movimiento = new MovimientoInventario({
            producto,
            tipo,
            cantidad,
            realizado_por: req.usuario._id,
            observaciones
        });
        await movimiento.save();

        // Save product update
        await prod.save();

        res.status(201).json(movimiento);
    } catch (error) {
        res.status(500).json({ msg: 'Error registering movement', error: error.message });
    }
};