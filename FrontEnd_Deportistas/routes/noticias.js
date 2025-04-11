const express = require('express');
const router = express.Router();
const noticiasController = require('../controllers/NoticiasController.js');
//mostrar todos los noticias con GET
router.get('/noticias', noticiasController.listar_noticias);

// // Ruta para mostrar los detalles de un ciclista específico

router.get('/noticias/:id', noticiasController.mostrar_noticia);

router.get('/index', noticiasController.listar_noticias);
//router.get('/', noticiasController.listar_noticias);

module.exports = router;