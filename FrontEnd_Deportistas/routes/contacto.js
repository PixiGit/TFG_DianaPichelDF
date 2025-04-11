const express = require('express');
const router = express.Router();
const contactoController = require('../controllers/ContactoController.js');


//mostrar todos los ciclistas con GET
router.get('/contacto', contactoController.listar_ciclistas);


module.exports = router;