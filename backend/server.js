// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const monitoresRouter = require('./routes/monitores');
const citasRouter = require('./routes/citas');
require('dotenv').config(); // Importar dotenv para usar el archivo .env

const app = express();
const PORT = process.env.PORT || 5000;

// Conexión a MongoDB usando la variable de entorno
const mongoURI = process.env.MONGODB_URI;

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Conectado a MongoDB'))
  .catch(err => console.error('Error de conexión a MongoDB', err));

// Middleware
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/monitores', monitoresRouter);
app.use('/api/citas', citasRouter);

// Inicia el servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
