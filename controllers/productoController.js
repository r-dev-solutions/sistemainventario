const Producto = require('../models/Producto');
const logAuditoria = require('../utils/auditoriaLogger'); // Import the logger

// List products with pagination and filters
exports.listarProductos = async (req, res) => {
    try {
        const { page = 1, limit = 10, nombre, categoria, activo, minPrecio, maxPrecio, minStock, maxStock } = req.query;
        const query = {};

        if (nombre) query.nombre = { $regex: nombre, $options: 'i' };
        if (categoria) query.categoria = categoria;
        if (activo !== undefined) query.activo = activo === 'true';
        if (minPrecio || maxPrecio) {
            query.precio_venta = {};
            if (minPrecio) query.precio_venta.$gte = Number(minPrecio);
            if (maxPrecio) query.precio_venta.$lte = Number(maxPrecio);
        }
        if (minStock || maxStock) {
            query.cantidad = {};
            if (minStock) query.cantidad.$gte = Number(minStock);
            if (maxStock) query.cantidad.$lte = Number(maxStock);
        }

        const productos = await Producto.find(query)
            .skip((page - 1) * limit)
            .limit(Number(limit));
        const total = await Producto.countDocuments(query);

        res.json({
            total,
            page: Number(page),
            limit: Number(limit),
            productos
        });
    } catch (error) {
        res.status(500).json({ msg: 'Error listing products', error: error.message });
    }
};

// Get product by ID
exports.obtenerProducto = async (req, res) => {
    try {
        const producto = await Producto.findById(req.params.id);
        if (!producto) return res.status(404).json({ msg: 'Product not found' });
        res.json(producto);
    } catch (error) {
        res.status(500).json({ msg: 'Error getting product', error: error.message });
    }
};

// Create product
exports.crearProducto = async (req, res) => {
    try {
        const nuevoProducto = new Producto({
            ...req.body,
            creado_por: req.usuario._id,
            fecha_ingreso: new Date()
        });
        await nuevoProducto.save();

        await logAuditoria({
            usuario: req.usuario._id,
            accion: 'crear_producto',
            entidad: 'producto',
            entidadId: nuevoProducto._id,
            detalle: req.body
        });

        res.status(201).json(nuevoProducto);
    } catch (error) {
        res.status(500).json({ msg: 'Error creating product', error: error.message });
    }
};

// Update product
exports.actualizarProducto = async (req, res) => {
    try {
        const producto = await Producto.findById(req.params.id);
        if (!producto) return res.status(404).json({ msg: 'Product not found' });

        const oldData = { ...producto._doc }; // Save old data for audit

        Object.assign(producto, req.body, {
            actualizado_por: req.usuario._id,
            fecha_actualización: new Date()
        });

        producto.historial_cambios.push({
            fecha: new Date(),
            usuario: req.usuario._id,
            tipo_cambio: 'actualización'
        });

        await producto.save();

        await logAuditoria({
            usuario: req.usuario._id,
            accion: 'actualizar_producto',
            entidad: 'producto',
            entidadId: producto._id,
            detalle: { before: oldData, after: req.body }
        });

        res.json(producto);
    } catch (error) {
        res.status(500).json({ msg: 'Error updating product', error: error.message });
    }
};

// Delete product (admin only)
exports.eliminarProducto = async (req, res) => {
    try {
        const producto = await Producto.findByIdAndDelete(req.params.id);
        if (!producto) return res.status(404).json({ msg: 'Product not found' });

        await logAuditoria({
            usuario: req.usuario._id,
            accion: 'eliminar_producto',
            entidad: 'producto',
            entidadId: producto._id,
            detalle: producto // Log the deleted product data
        });

        res.json({ msg: 'Product deleted' });
    } catch (error) {
        res.status(500).json({ msg: 'Error deleting product', error: error.message });
    }
};