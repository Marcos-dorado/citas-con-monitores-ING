// routes/monitores.js
const express = require('express');
const router = express.Router();
const Monitor = require('../models/Monitor');

// Obtener todos los monitores
router.get('/', async (req, res) => {
  try {
    const monitores = await Monitor.find();
    res.json(monitores);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
