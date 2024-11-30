// //controllers/citasController.js
// const moment = require('moment');
// const validacionesCitas = require('../utils/validacionesCitas');
// const Cita = require('../models/Cita');

// exports.reservarCita = async (req, res) => {
//   try {
//     const { fecha, hora, monitor } = req.body;

//     // Realizar todas las validaciones
//     await validacionesCitas.validarHorarioCita(fecha, hora);
//     await validacionesCitas.esCitaDisponible(fecha, hora, monitor, Cita);

//     // Si pasa todas las validaciones, crear la cita
//     const cita = new Cita({
//       fecha: moment(fecha).toDate(),
//       hora,
//       monitor
//     });

//     await cita.save();
//     res.status(201).json({ 
//       message: "Cita reservada con éxito",
//       cita
//     });

//   } catch (error) {
//     res.status(400).json({ 
//       error: error.message || "Error al reservar la cita" 
//     });
//   }
// };





//controllers/citasController.js
const moment = require('moment-timezone');
const Cita = require('../models/Cita');
const Monitor = require('../models/Monitor'); // Asegúrate de importar el modelo de Monitor

// Obtener todas las citas
exports.obtenerCitas = async (req, res) => {
  try {
    // Obtener todas las citas y poblar la información del monitor si es necesario
    const citas = await Cita.find({})
      .sort({ fecha: 1, hora: 1 });

    // Formatear las citas para asegurar consistencia
    const citasFormateadas = citas.map(cita => ({
      _id: cita._id,
      fecha: moment(cita.fecha).tz('America/Bogota').format('YYYY-MM-DD'),
      hora: cita.hora,
      monitor: cita.monitor,
      detalles: cita.detalles || ''
    }));

    res.json(citasFormateadas);
  } catch (error) {
    console.error('Error al obtener citas:', error);
    res.status(500).json({ error: 'Error al obtener las citas' });
  }
};

// Crear nueva cita
exports.reservarCita = async (req, res) => {
  try {
    const { fecha, hora, monitor } = req.body;

    // Validar que el monitor existe
    const monitorExistente = await Monitor.findOne({ nombre: monitor });
    if (!monitorExistente) {
      return res.status(400).json({ error: 'Monitor no encontrado' });
    }

    // Crear la cita
    // const cita = new Cita({
    //   fecha: moment(fecha).tz('America/Bogota').toDate(),
    //   hora,
    //   monitor,
    // });
    const cita = new Cita({
        fecha: moment.tz(fecha, 'America/Bogota').startOf('day').toDate(), // Asegura la fecha en zona horaria específica
        hora,
        monitor,
      });
      
    await cita.save();

    res.status(201).json({
      message: "Cita reservada con éxito",
      cita: {
        _id: cita._id,
        fecha: moment(cita.fecha).tz('America/Bogota').format('YYYY-MM-DD'),
        hora: cita.hora,
        monitor: cita.monitor,
      }
    });
  } catch (error) {
    console.error('Error al reservar cita:', error);
    res.status(400).json({
      error: error.message || "Error al reservar la cita"
    });
  }
};

// Obtener citas por fecha
exports.obtenerCitasPorFecha = async (req, res) => {
  try {
    const { fecha } = req.query;
    
    const startOfDay = moment(fecha).tz('America/Bogota').startOf('day').toDate();
    const endOfDay = moment(fecha).tz('America/Bogota').endOf('day').toDate();
    
    const citas = await Cita.find({
      fecha: {
        $gte: startOfDay,
        $lte: endOfDay
      }
    }).sort({ hora: 1 });

    res.json(citas);
  } catch (error) {
    console.error('Error al obtener citas por fecha:', error);
    res.status(500).json({ error: 'Error al obtener las citas por fecha' });
  }
};

// Obtener monitores
exports.obtenerMonitores = async (req, res) => {
  try {
    const monitores = await Monitor.find({});
    res.json(monitores);
  } catch (error) {
    console.error('Error al obtener monitores:', error);
    res.status(500).json({ error: 'Error al obtener los monitores' });
  }
};