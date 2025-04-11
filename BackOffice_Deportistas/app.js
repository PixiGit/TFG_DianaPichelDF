const express = require('express');
const app = express();
const path = require('path');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('./passportConfig');

const authRoutes = require('./routes/auth');
const authMiddleware = require('./middleware/authMiddleware');
const db = require('./db');

const ciclistasRoutes = require('./routes/ciclistas');
const competicionesRoutes = require('./routes/competiciones');
const noticiasRoutes = require('./routes/noticias');

// Configurar prefijo para BackOffice
const router = express.Router();

router.use(express.urlencoded({ extended: true }));
router.use(express.json());
router.use(cookieParser());
router.use(session({
  secret: 'secreto',
  resave: false,
  saveUninitialized: false
}));
router.use(flash()); 
router.use(passport.initialize());
router.use(passport.session());

// Middleware global para pasar mensajes flash a las vistas
router.use((req, res, next) => {
  res.locals.error = req.flash('error');
  next();
});

//este codigo se usa para evitar cache
router.use((req, res, next) => {
  res.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  res.set('Pragma', 'no-cache');
  res.set('Expires', '0');
  res.set('Surrogate-Control', 'no-store');
  next();
});
// Servir archivos estáticos correctamente
router.use('/public', express.static(path.join(__dirname, 'public')));
router.use('/img_ciclistas', express.static(path.join(__dirname, '../img_ciclistas')));
router.use('/img_noticias', express.static(path.join(__dirname, '../img_noticias')));


// Configuración de EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Corregir rutas para usar /backoffice/
router.use('/auth', authRoutes);
router.use('/ciclistas', authMiddleware, ciclistasRoutes);
router.use('/competiciones', authMiddleware, competicionesRoutes);
router.use('/noticias', authMiddleware, noticiasRoutes);

// Ruta de inicio
router.get('/', (req, res) => {
    res.render('login', { error: null });
});

// Redirigir después del login
router.get('/index', authMiddleware, (req, res) => {
    res.redirect('/backoffice/ciclistas');
});

// Aplicar el router
app.use(router);
//app.use('/backoffice', router);

// Iniciar servidor en 0.0.0.0
const PORT = process.env.PORT || 3001;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Servidor BackOffice corriendo en http://0.0.0.0:${PORT}`);
});

module.exports = app;
