// src/docs/swagger.js
const swaggerJsdoc = require('swagger-jsdoc');
const path = require('path');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Frutos Secos',
      version: '1.0.0',
      description: 'API REST para gestión de ventas, stock y ganancias',
    },
    servers: [
      { url: 'http://localhost:3000', description: 'Servidor local' }
    ],
  },
  apis: [path.join(__dirname, '../routes/*.routes.js')],
  apis: [
    path.join(__dirname, '../routes/*.routes.js'), // ✅ toma TODAS las rutas
  ],
};

const swaggerSpec = swaggerJsdoc(options);
module.exports = swaggerSpec;