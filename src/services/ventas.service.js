const Venta = require('../models/venta.model');
const Producto = require('../models/producto.model');

exports.crearVenta = async (data) => {
  const producto = await Producto.findById(data.productoId);

  if (!producto) throw new Error('Producto no existe');

  const ganancia =
    (data.precioVenta - (producto.costoBase + producto.costoInsumos)) *
    data.cantidad;

  const nuevaVenta = new Venta({
    ...data,
    ganancia
  });

  await nuevaVenta.save();

  // actualizar stock
  producto.stock -= data.cantidad;
  await producto.save();

  return { mensaje: 'Venta registrada', ganancia };
};