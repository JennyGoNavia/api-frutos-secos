const express = require('express');
const path = require('path');
const app = express();

const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./docs/swagger');

// rutas
const ventasRoutes    = require('./routes/ventas.routes');
const productosRoutes = require('./routes/productos.routes');
const vendedoresRoutes = require('./routes/vendedores.routes');
const authRoutes      = require('./routes/auth.routes');

app.use(express.json());

// ruta raíz - redirecciona a documentación
app.get('/', (req, res) => {
  res.redirect('/api-docs');
});

// servir dashboard.html como archivo estático
app.use(express.static(path.join(__dirname, 'public')));

// endpoints
app.use('/auth',       authRoutes);
app.use('/ventas',     ventasRoutes);
app.use('/productos',  productosRoutes);
app.use('/vendedores', vendedoresRoutes);

// swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

module.exports = app;