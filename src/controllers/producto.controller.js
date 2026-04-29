const Producto = require('../models/producto.model');

const crearProducto = async (req, res) => {
  try {
    const producto = new Producto(req.body);
    await producto.save();
    res.json(producto);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const listarProductos = async (req, res) => {
  try {
    const productos = await Producto.find();
    res.json(productos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  crearProducto,
  listarProductos
};