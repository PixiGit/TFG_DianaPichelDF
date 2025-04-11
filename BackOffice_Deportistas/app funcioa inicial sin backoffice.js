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

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(session({
  secret: 'secreto',
  resave: false,
  saveUninitialized: false
}));
app.use(flash()); //para mensajes flash
app.use(passport.initialize());
app.use(passport.session());
// Middleware global para pasar mensajes flash a las vistas
app.use((req, res, next) => {
  res.locals.error = req.flash('error');
  next();
});
app.use(express.static('public'));
app.use('/auth', authRoutes);
app.use('/ciclistas', authMiddleware, ciclistasRoutes);
app.use('/competiciones', authMiddleware, competicionesRoutes);
app.use('/noticias', authMiddleware, noticiasRoutes);

// Configuración de EJS para renderizar vistas
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Ruta de inicio: formulario de login
app.get('/backoffice', (req, res) => {
//app.get('/', (req, res) => {
    res.render('login', { error: null });
});

// Redirigir a index después del login exitoso
app.get('/index', authMiddleware, (req, res) => {
  res.redirect('/ciclistas');
    //res.render('index');
});


const PORT = process.env.PORT || 3001;
app.listen(PORT, '0.0.0.0', () => {
    //console.log(`Servidor BackOffice corriendo en http://0.0.0.0:${PORT}`);
    console.log(`Servidor BackOffice corriendo en el puerto ${PORT}`);
});
//const HOST = '127.0.0.1'; // Solo accesible desde IIS

//app.listen(PORT, () => {
//    console.log(`Servidor BackOffice corriendo en el puerto ${PORT}`);
//});



module.exports = app;
