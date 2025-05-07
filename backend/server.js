require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { syncDatabase } = require('./models');
const authRoutes = require('./controllers/authController');
const productRoutes = require('./controllers/productController');

const app = express();

app.use(cors());
app.use(express.json());

// Agrega este middleware para logging
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);

// Agrega este log para ver las rutas registradas
console.log('Rutas disponibles:', app._router.stack
  .filter(r => r.route)
  .map(r => `${Object.keys(r.route.methods)} ${r.route.path}`));

// Inicializar base de datos
syncDatabase().then(() => {
  console.log('Base de datos inicializada');
  
  const PORT = process.env.PORT || 8000;  // Cambiado de 5000 a 8000
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
  });
}).catch(err => {
  console.error('Error al inicializar la base de datos:', err);
});