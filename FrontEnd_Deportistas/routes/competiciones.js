const express = require('express');
const router = express.Router();
const competicionesController = require('../controllers/CompeticionesController.js');

//mostrar todos los ciclistas con GET
router.get('/competiciones', competicionesController.listar_competiciones);

module.exports = router;