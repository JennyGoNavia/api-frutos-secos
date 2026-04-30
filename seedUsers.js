require('dotenv').config({ debug: false, quiet: true });
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const URI = process.env.MONGO_URI;

const userSchema = new mongoose.Schema({
  nombre: String,
  username: { type: String, unique: true },
  password: String,
});

const User = mongoose.model('User', userSchema);

async function seed() {
  if (!URI) {
    console.log('⚠️ MONGO_URI no configurada - saltando seed');
    return;
  }

  try {
    await mongoose.connect(URI);
    console.log('Conectado a MongoDB');

    const hash = await bcrypt.hash('admin123', 10);

    // Crear o actualizar usuarios
    await User.findOneAndUpdate(
      { username: 'jenny' },
      { nombre: 'Jenny', password: hash },
      { upsert: true, new: true }
    );

    await User.findOneAndUpdate(
      { username: 'anto' },
      { nombre: 'Anto', password: hash },
      { upsert: true, new: true }
    );

    console.log('✅ Usuarios creados/actualizados: jenny / admin123 | anto / admin123');
  } catch (err) {
    console.error('❌ Error en seed:', err.message);
  } finally {
    await mongoose.disconnect();
  }
}

seed();