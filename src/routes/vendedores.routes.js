const express = require('express');
const router = express.Router();
const Vendedor = require('../models/vendedor.model');

/**
 * @swagger
 * /vendedores:
 *   post:
 *     summary: Registrar un nuevo vendedor
 *     tags: [Vendedores]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *     responses:
 *       201:
 *         description: Vendedor creado
 */
router.post('/', async (req, res) => {
  try {
    const vendedor = new Vendedor(req.body);
    await vendedor.save();
    res.status(201).json(vendedor);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

/**
 * @swagger
 * /vendedores:
 *   get:
 *     summary: Obtener todos los vendedores
 *     tags: [Vendedores]
 *     responses:
 *       200:
 *         description: Lista de vendedores
 */
router.get('/', async (req, res) => {
  try {
    const vendedores = await Vendedor.find();
    res.json(vendedores);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;