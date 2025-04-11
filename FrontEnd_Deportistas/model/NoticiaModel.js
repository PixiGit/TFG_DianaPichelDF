// Importación de Mongoose y el esquema
const mongoose = require('mongoose'); 
const Schema = mongoose.Schema; 

//Formato de fecha españa
const { format } = require('date-fns');
const { es } = require('date-fns/locale');

// Definición del esquema de la noticias
const NoticiaSchema = new Schema({ 
  fechapub: { type: Date, 
    get: function(v) {
      return format(v, 'dd/MM/yyyy', { locale: es });
    }, 
    required: true },
  titulo: { type: String, required: true },
  cuerpo: { type: String, required: true },
  foto: {type: String, required: true}
 },{versionKey:false}); 


 // Exportar el modelo de la noticias utilizando el esquema definido
 module.exports = mongoose.model('noticias', NoticiaSchema);