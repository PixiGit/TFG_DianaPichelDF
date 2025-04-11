// Importación de módulos necesarios

var mongoose = require('mongoose'); 
const Ciclistas = require('../model/CiclistaModel');
const Competicion = require('../model/CompeticionModel');


// Controlador para mostrar todas las competiciones
module.exports.listar_competiciones = (req, res) => {
    Ciclistas.find({})
        .then(ciclistas => {
            Competicion.find({}).then(competiciones=>{
                return res.render('competiciones.ejs',{ciclistas: ciclistas, competiciones:competiciones})
            })
       ;
            
        })
        .catch(error => {
            // Manejamos errores
            console.error(error);
            res.status(500).json({ mensaje: 'Error interno del servidor' });
        });

}

