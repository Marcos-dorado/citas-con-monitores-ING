// backend/app.js
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const appointmentRoutes = require('./routes/appointmentRoutes');

const app = express();
connectDB();

app.use(cors());
app.use(express.json());

// Rutas de la API
app.use('/api/appointments', appointmentRoutes,);



// Middleware de manejo de errores
app.use((err, req, res, next) => {
    console.error('Error en el servidor:', err);
    res.status(500).json({
      error: 'Error en el servidor',
      details: err.message
    });
  });

module.exports = app;


