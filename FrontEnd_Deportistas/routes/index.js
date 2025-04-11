const express = require('express');
const router = express.Router();
const indexController = require('../controllers/IndexController.js');


//mostrar todos los ciclistas con GET
router.get('/', indexController.listar_ciclistas);


module.exports = router;