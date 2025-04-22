const Proveedor = require('../models/Proveedor');

exports.listarProveedores = async (req, res) => {
    try {
        const proveedores = await Proveedor.find();
        res.json(proveedores);
    } catch (error) {
        res.status(500).json({ msg: 'Error listing suppliers', error: error.message });
    }
};

exports.crearProveedor = async (req, res) => {
    try {
        const proveedor = new Proveedor(req.body);
        await proveedor.save();
        res.status(201).json(proveedor);
    } catch (error) {
        res.status(500).json({ msg: 'Error creating supplier', error: error.message });
    }
};

exports.actualizarProveedor = async (req, res) => {
    try {
        const proveedor = await Proveedor.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!proveedor) return res.status(404).json({ msg: 'Supplier not found' });
        res.json(proveedor);
    } catch (error) {
        res.status(500).json({ msg: 'Error updating supplier', error: error.message });
    }
};

exports.eliminarProveedor = async (req, res) => {
    try {
        const proveedor = await Proveedor.findByIdAndDelete(req.params.id);
        if (!proveedor) return res.status(404).json({ msg: 'Supplier not found' });
        res.json({ msg: 'Supplier deleted' });
    } catch (error) {
        res.status(500).json({ msg: 'Error deleting supplier', error: error.message });
    }
};