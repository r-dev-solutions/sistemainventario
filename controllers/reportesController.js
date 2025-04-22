const Producto = require('../models/Producto');
const Movimiento = require('../models/MovimientoInventario');

// List products with low stock
exports.productosBajoStock = async (req, res) => {
    try {
        const { minStock = 5, categoria, proveedor } = req.query;
        const query = { cantidad: { $lte: Number(minStock) } };
        if (categoria) query.categoria = categoria;
        if (proveedor) query.proveedor = proveedor;

        const productos = await Producto.find(query);
        res.json(productos);
    } catch (error) {
        res.status(500).json({ msg: 'Error fetching low stock products', error: error.message });
    }
};

// List products with no movement in a given period
exports.productosSinMovimiento = async (req, res) => {
    try {
        const { dias = 30 } = req.query;
        const fechaLimite = new Date();
        fechaLimite.setDate(fechaLimite.getDate() - dias);

        // Find products with no movements in the last X days
        const productosConMovimiento = await Movimiento.distinct('producto', { fecha: { $gte: fechaLimite } });
        const productos = await Producto.find({ _id: { $nin: productosConMovimiento } });

        res.json(productos);
    } catch (error) {
        res.status(500).json({ msg: 'Error fetching products without movement', error: error.message });
    }
};

// List products near expiration (if you have a 'fecha_vencimiento' field)
exports.productosProximosAVencer = async (req, res) => {
    try {
        const { dias = 30 } = req.query;
        const fechaLimite = new Date();
        fechaLimite.setDate(fechaLimite.getDate() + Number(dias));

        // Only works if your Producto model has 'fecha_vencimiento'
        const productos = await Producto.find({ fecha_vencimiento: { $lte: fechaLimite } });
        res.json(productos);
    } catch (error) {
        res.status(500).json({ msg: 'Error fetching products near expiration', error: error.message });
    }
};