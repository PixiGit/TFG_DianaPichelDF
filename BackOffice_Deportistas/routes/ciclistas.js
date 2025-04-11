const express = require('express');
const router = express.Router();
const ciclistasController = require('../controllers/CiclistasController.js');


const multer = require('multer');
const path = require('path');

// Middleware de autenticación (si es necesario)
const authMiddleware = require('../middleware/authMiddleware');

//mostrar todos los ciclistas con GET
router.get('/', authMiddleware, ciclistasController.listar_ciclistas);

// Ruta para mostrar los detalles de un ciclista específico
//router.get('/ciclistas/:id', ciclistasController.mostrar_ciclista);
router.get('/:id', authMiddleware,ciclistasController.mostrar_ciclista);

//crear ciclista con POST
router.post('/crear', authMiddleware, ciclistasController.crear);
//edtiar competición con POST
router.post('/editar', authMiddleware,ciclistasController.editar);
//borrar competicion con GET
router.get('/borrar/:id', authMiddleware,ciclistasController.borrar);

module.exports = router;

