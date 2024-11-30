// const express = require('express');
// const router = express.Router();
// const citasController = require('../controllers/citasController');

// // Ruta para reservar cita
// router.post('/', citasController.reservarCita);

// // Obtener citas para una fecha específica
// router.get('/', async (req, res) => {
//   const { fecha } = req.query;
//   try {
//     let query = {};
//     if (fecha) {
//       const startOfDay = moment(fecha).startOf('day').toDate();
//       const endOfDay = moment(fecha).endOf('day').toDate();
//       query = { fecha: { $gte: startOfDay, $lte: endOfDay } };
//     }
//     const citas = await Cita.find(query);
//     res.json(citas);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// module.exports = router;


//routes/citas.js
const express = require('express');
const router = express.Router();
const citasController = require('../controllers/citasController');

// Rutas para citas
router.get('/', citasController.obtenerCitas);
router.post('/', citasController.reservarCita);
router.get('/fecha', citasController.obtenerCitasPorFecha);

// Ruta para monitores
router.get('/monitores', citasController.obtenerMonitores);

module.exports = router;