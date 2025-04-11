// Importación de Mongoose y el esquema
const mongoose = require('mongoose'); 
const Schema = mongoose.Schema; 

//Formato de fecha españa
const { format } = require('date-fns');
const { es } = require('date-fns/locale');

// Definición del esquema de la competición
const CompeticionSchema = new Schema({ 
  titulo: { type: String, required: true},
  lugar: {type: String, required: true},
  fecha: { type: Date, 
    get: function(v) {
      return format(v, 'dd/MM/yyyy', { locale: es });
    },     
    required:true }, 
  enlace: {type: String, required: true}, 
  resultado: {type: String, required: true}
 },{versionKey:false}); 


 // Exportar el modelo de la competición utilizando el esquema definido
 module.exports = mongoose.model('competiciones', CompeticionSchema);
