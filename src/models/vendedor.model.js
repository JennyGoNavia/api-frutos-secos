const mongoose = require('mongoose');

const vendedorSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Vendedor', vendedorSchema);