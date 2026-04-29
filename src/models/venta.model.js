const mongoose = require('mongoose');

const ventaSchema = new mongoose.Schema({
  productoId:  { type: mongoose.Schema.Types.ObjectId, ref: 'Producto', required: true },
  vendedorId: { type: String, required: true },
  cantidad:    { type: Number, required: true },
  precioVenta: { type: Number, required: true },
  ganancia:    { type: Number },
  fecha:       { type: Date, default: Date.now },
}, { timestamps: true });

module.exports = mongoose.model('Venta', ventaSchema);