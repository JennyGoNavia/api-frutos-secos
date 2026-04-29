const ventasService = require('../services/ventas.service');

exports.crearVenta = async (req, res) => {
  try {
    const result = await ventasService.crearVenta(req.body);
    res.json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};