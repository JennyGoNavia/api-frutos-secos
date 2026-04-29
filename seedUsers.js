require('dotenv').config();
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
  await mongoose.connect(URI);
  console.log('Conectado a MongoDB');

  await User.deleteMany({});

  const hash = await bcrypt.hash('admin123', 10);

  await User.insertMany([
    { nombre: 'Jenny', username: 'jenny', password: hash },
    { nombre: 'Anto',  username: 'anto',  password: hash },
  ]);

  console.log('✅ Usuarios creados: jenny / admin123  |  anto / admin123');
  await mongoose.disconnect();
}

seed().catch(err => { console.error(err); process.exit(1); });