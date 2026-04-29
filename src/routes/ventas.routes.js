const express = require('express');
const router = express.Router();
const Venta = require('../models/venta.model');
const Producto = require('../models/producto.model');

/**
 * @swagger
 * /ventas:
 *   post:
 *     summary: Crear una venta
 *     tags: [Ventas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productoId:
 *                 type: string
 *               vendedorId:
 *                 type: string
 *               cantidad:
 *                 type: number
 *               precioVenta:
 *                 type: number
 *     responses:
 *       201:
 *         description: Venta creada
 */
const authMiddleware = require('../middleware/auth.middleware');

router.post('/', authMiddleware, async (req, res) => {
  try {
    const { productoId, cantidad, precioVenta } = req.body;
    const vendedorNombre = req.user.nombre; // 👈 viene del token

    const producto = await Producto.findById(productoId);
    if (!producto) return res.status(404).json({ error: 'Producto no encontrado' });

    const costTotal = (producto.costoBase + producto.costoInsumos) * cantidad;
    const ganancia  = (precioVenta * cantidad) - costTotal;

    const venta = new Venta({ 
      productoId, 
      vendedorId: vendedorNombre, // 👈 guarda el nombre directamente
      cantidad, 
      precioVenta, 
      ganancia 
    });
    await venta.save();

    producto.stock -= cantidad;
    await producto.save();

    res.status(201).json(venta);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

/**
 * @swagger
 * /ventas:
 *   get:
 *     summary: Obtener todas las ventas
 *     tags: [Ventas]
 *     responses:
 *       200:
 *         description: Lista de ventas
 */
router.get('/', async (req, res) => {
  try {
    const ventas = await Venta.find()
      .populate('productoId', 'nombre')
      .sort({ fecha: -1 });
    res.json(ventas);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * @swagger
 * /ventas/ganancias:
 *   get:
 *     summary: Ganancia total por vendedor
 *     tags: [Ventas]
 *     responses:
 *       200:
 *         description: Ganancias agrupadas por vendedor
 */
router.get('/ganancias', async (req, res) => {
  try {
    const ganancias = await Venta.aggregate([
      { $group: {
        _id: '$vendedorId',
        totalGanancia: { $sum: '$ganancia' }
      }}
    ]);
    res.json(ganancias);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;