const mongoose = require('mongoose');

// URL de conexión a la base de datos MongoDB
const url = 'mongodb://localhost:27017/webCiclistas';

// Conectarse a la base de datos MongoDB
mongoose.connect(url);

// Obtener la conexión a la base de datos
const db = mongoose.connection;

// Manejar errores de conexión
db.on('error', console.error.bind(console, 'error al conectar MongoDB'));

// Ejecutar una vez la conexión es abierta
db.once('open', function callback() {
  console.log('Conexión exitosa a la base de datos MongoDB');
});

// Exportar la conexión para su uso en otros archivos
module.exports = db;
