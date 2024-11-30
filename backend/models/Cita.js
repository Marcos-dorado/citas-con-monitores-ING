//models/Cita.js
// const mongoose = require('mongoose');

// const citaSchema = new mongoose.Schema({
//   fecha: { type: Date, required: true },
//   monitor: { type: String, required: true },
//   hora: { type: String, required: true },
// });

// module.exports = mongoose.model('Cita', citaSchema);



//models/Cita.js
const mongoose = require('mongoose');

const citaSchema = new mongoose.Schema({
  fecha: {
    type: Date,
    required: true
  },
  hora: {
    type: String,
    required: true
  },
  monitor: {
    type: String,
    required: true
  },
  detalles: {
    type: String,
    default: ''
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Cita', citaSchema);