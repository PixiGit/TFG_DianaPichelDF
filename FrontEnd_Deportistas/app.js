const express = require('express');
const multer = require('multer');
const path = require('path');
const { format } = require('date-fns');
const app = express();

const db = require('./db.js');

global.rutaImagenesCiclistas=path.join(__dirname,'..','../img_ciclistas'); //ruta global a la carpeta compartida de alta de imágenes de ciclistas en crud y lectura en la web
//global.rutaImagenesNoticias=path.join(__dirname,'..','img_noticias'); //ruta global a la carpeta compartida de alta de imágenes de noticias en crud y lectura en la web
global.rutaImagenesNoticias = '/img_noticias/'; //ruta global a la carpeta compartida de alta de imágenes de noticias en crud y lectura en la web

// Servir imágenes de forma correcta
app.use('/img_ciclistas', express.static(global.rutaImagenesCiclistas));
//app.use('/img_noticias', express.static(global.rutaImagenesNoticias));
app.use('/img_noticias', express.static(path.join(__dirname, '..', 'img_noticias')));

// Configurar el motor de plantillas EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Parsear solicitudes con body-parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Servir archivos estáticos desde la carpeta 'public'
app.use(express.static(path.join(__dirname,'public')));

//desactivar la cache del navegador
app.use((req, res, next) => {
  res.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  res.set('Pragma', 'no-cache');
  res.set('Expires', '0');
  res.set('Surrogate-Control', 'no-store');
  next();
});

// Importar y usar las rutas de ciclistas desde el archivo correspondiente
const ciclistasRoutes = require('./routes/ciclistas');
app.use(ciclistasRoutes);

const indexRoutes = require('./routes/index');
app.use(indexRoutes);

const contactoRoutes = require('./routes/contacto');
app.use(contactoRoutes);

const competicionesRoutes = require('./routes/competiciones');
app.use(competicionesRoutes);

const noticiasRoutes = require('./routes/noticias');
app.use(noticiasRoutes);

// Ruta para la página de inicio
app.get('/', (req, res) => {
  res.render('Ciclistas');
});

// app.get('/', (req, res) => {
//   res.render('Noticias');
// });


// configuracion puerto estandar para IIS

//const PORT = process.env.PORT || 3000;
//const HOST = '127.0.0.1'; // Solo accesible desde IIS
//app.listen(PORT, HOST, () => {
 //   console.log(`Servidor frontend corriendo en http://${HOST}:${PORT}`);
//});

const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
    //console.log(`Servidor frontend corriendo en http://0.0.0.0:${PORT}`);
    console.log(`Servidor frontend corriendo en el puerto ${PORT}`);
});

//app.get('/', (req, res) => {
//    res.send("Servidor funcionando correctamente");
//});

//app.listen(PORT, () => {
 //   console.log(`Servidor frontend corriendo en el puerto ${PORT}`);
//});
//const HOST = '0.0.0.0'; // Permite conexiones desde cualquier IP

//app.listen(PORT, HOST, () => {
//    console.log(`Servidor corriendo en http://${HOST}:${PORT}`);
//});