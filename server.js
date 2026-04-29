require('dotenv').config({ debug: false, quiet: true });

const app = require('./src/app');
const connectDB = require('./src/config/db');

connectDB(); // 🔥 CONECTA A MONGO

app.listen (3000);