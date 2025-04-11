const express = require('express');
const multer = require('multer');
const path = require('path');
const { format } = require('date-fns');
const app = express();

const db = require('./db.js');

global.rutaImagenesCiclistas="../img_ciclistas/"; //ruta global a la carpeta compartida de alta de imágenes de ciclistas en crud y lectura en la web
global.rutaImagenesNoticias="../img_noticias/"; //ruta global a la carpeta compartida de alta de imágenes de noticias en crud y lectura en la web
// Configurar Multer para guardar las imágenes en el servidor
/*const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'img_ciclistas/'); // Ruta donde se guardarán las imágenes
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
  });
*/
  // Definir una ruta para servir las imágenes estáticas
//app.use('/img_ciclistas/', express.static(path.join(__dirname, '/img_ciclistas/')));
app.use('/img_ciclistas/', express.static(path.join("..", '/img_ciclistas/')));

app.use('/img_noticias/', express.static(path.join("..", '/img_noticias/')));


// Configurar el motor de plantillas EJS
app.set('view engine', 'ejs');

// Parsear solicitudes con body-parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Servir archivos estáticos desde la carpeta 'public'
app.use(express.static('public'));

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


// escuchar en el puerto 3001
app.listen(3001, () => {
  console.log('Servidor corriendo en el puerto 3001');
});