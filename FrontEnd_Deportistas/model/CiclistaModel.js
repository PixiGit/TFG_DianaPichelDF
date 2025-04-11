// Importación de Mongoose y el esquema
const mongoose = require('mongoose'); 
const Schema = mongoose.Schema; 

//Formato de fecha españa
const { format } = require('date-fns');
const { es } = require('date-fns/locale');

// Definición del esquema del ciclista
const CiclistaSchema = new Schema({   
  nombre: {type: String, required: true},
  fecha_nacimiento: { type: Date, 
    // Función validación para formatear fecha antes de guardarla en la base de datos

    get: function(v) {
      return format(v, 'dd/MM/yyyy', { locale: es });
    }, 
    required:true },        
  foto: {type: String, required: true},
  nacionalidad: {type: String, required: true},
  altura:{type: Number, required: true},
  equipo:{type: String, required: true},
  historial:{type: String, required: true},
  peso:{type: Number, required: true},
  ultimo_palmares:{type: String, required: true}
  
 },{versionKey:false}); 


 // Exportar el modelo de ciclista utilizando el esquema definido
 module.exports = mongoose.model('ciclistas', CiclistaSchema);
