// /routes/competiciones.js
const express = require('express');
const router = express.Router();
const competicionController = require('../controllers/CompeticionesController.js');

// Middleware de autenticación (si es necesario)
const authMiddleware = require('../middleware/authMiddleware');

// Rutas para mostrar todas las competiciones, crear, editar y borrar
router.get('/', authMiddleware, competicionController.mostrar);
router.post('/crear', authMiddleware, competicionController.crear);
router.post('/editar', authMiddleware, competicionController.editar);
router.get('/borrar/:id', authMiddleware, competicionController.borrar);

module.exports = router;