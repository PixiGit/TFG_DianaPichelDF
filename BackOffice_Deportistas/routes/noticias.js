// /routes/noticias.js
const express = require('express');
const router = express.Router();
const noticiaController = require('../controllers/NoticiasController.js');

const multer = require('multer');
const path = require('path');
// Middleware de autenticación (si es necesario)
const authMiddleware = require('../middleware/authMiddleware');
// Rutas para mostrar todas las noticias, crear, editar y borrar
router.get('/', authMiddleware, noticiaController.mostrar);
router.post('/crear', authMiddleware, noticiaController.crear);
router.post('/editar', authMiddleware, noticiaController.editar);
router.get('/borrar/:id', authMiddleware, noticiaController.borrar);

module.exports = router;