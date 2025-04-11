const express = require('express');
const router = express.Router();
const ciclistasController = require('../controllers/CiclistasController.js');

//mostrar todos los ciclistas con GET
router.get('/ciclistas', ciclistasController.listar_ciclistas);

// Ruta para mostrar los detalles de un ciclista específico
//router.get('/ciclistas/:id', ciclistasController.mostrar_ciclista);
router.get('/ciclistas/:id', ciclistasController.mostrar_ciclista);

//router.get('/index', ciclistasController.listar_ciclistas);

module.exports = router;