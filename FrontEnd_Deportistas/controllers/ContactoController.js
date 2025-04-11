var mongoose = require('mongoose'); 
const Ciclista = require('../model/CiclistaModel');

module.exports.listar_ciclistas = (req, res) => {
    Ciclista.find({})
        .then(ciclistas => {
            console.log("ContactoController");
            console.log(ciclistas);
            
            // Renderizar la vista con los ciclistas (necesarios para el menú)
            return res.render('contacto.ejs',{ciclistas: ciclistas});
            
        })
        .catch(error => {
            // Manejamos errores
            console.error(error);
            res.status(500).json({ mensaje: 'Error interno del servidor' });
        });

}