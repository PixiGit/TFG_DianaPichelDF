const mongoose = require('mongoose');

// Definir la URL de conexión con variable de entorno
const mongoURI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/webCiclistas';

// Conectarse a MongoDB con manejo de errores
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('Conexión exitosa a MongoDB'))
  .catch(err => console.error('Error al conectar MongoDB:', err));

// Exportar la conexión
module.exports = mongoose.connection;