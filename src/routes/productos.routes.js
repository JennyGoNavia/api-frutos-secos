const express = require('express');
const router = express.Router();
const Producto = require('../models/producto.model');

/**
 * @swagger
 * /productos:
 *   post:
 *     summary: Registrar un nuevo producto
 *     tags: [Productos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               costoBase:
 *                 type: number
 *               costoInsumos:
 *                 type: number
 *               stock:
 *                 type: number
 *     responses:
 *       201:
 *         description: Producto creado
 */
router.post('/', async (req, res) => {
  try {
    const producto = new Producto(req.body);
    await producto.save();
    res.status(201).json(producto);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

/**
 * @swagger
 * /productos:
 *   get:
 *     summary: Obtener todos los productos
 *     tags: [Productos]
 *     responses:
 *       200:
 *         description: Lista de productos
 */
router.get('/', async (req, res) => {
  try {
    const productos = await Producto.find();
    res.json(productos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;