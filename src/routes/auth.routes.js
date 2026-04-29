const express = require('express');
const router  = express.Router();
const bcrypt  = require('bcryptjs');
const jwt     = require('jsonwebtoken');
const User    = require('../models/user.model');

const SECRET = process.env.JWT_SECRET || 'frutos_secos_secret';

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Iniciar sesión
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Token JWT
 *       401:
 *         description: Credenciales inválidas
 */
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) return res.status(401).json({ error: 'Usuario no encontrado' });

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(401).json({ error: 'Contraseña incorrecta' });

  const token = jwt.sign(
    { id: user._id, nombre: user.nombre, username: user.username },
    SECRET,
    { expiresIn: '8h' }
  );

  res.json({ token, nombre: user.nombre, username: user.username });
});

module.exports = router;