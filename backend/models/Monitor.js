//models/Monitor.js
const mongoose = require('mongoose');

const monitorSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  especialidad: { type: String, required: true },
});

module.exports = mongoose.model('Monitor', monitorSchema);
