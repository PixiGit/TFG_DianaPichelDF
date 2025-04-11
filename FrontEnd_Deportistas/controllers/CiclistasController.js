// Importación de módulos necesarios

var mongoose = require('mongoose'); 
const Ciclista = require('../model/CiclistaModel');



// Controlador para mostrar todos los ciclistas
module.exports.listar_ciclistas = (req, res) => {
    Ciclista.find({})
        .then(ciclistas => {
            console.log(ciclistas);
            
            // Renderizar la vista de ciclistas después de enviar los ciclistas como respuesta
        //return res.render('ciclistas.ejs',{ciclistas: ciclistas});
return res.render('ciclistas.ejs', {ciclistas: ciclistas, rutaImagenesCiclistas: '/img_ciclistas/' });
            
        })
        .catch(error => {
            // Manejamos errores
            console.error(error);
            res.status(500).json({ mensaje: 'Error interno del servidor' });
        });

}

async function getCiclistas(){

    const Items = await Ciclista.find({});
    return Items;
  
  }


  module.exports.mostrar_ciclista = (req, res) => {
    const idBuscar = req.params.id;
    console.log(idBuscar); 
    var query = { _id: idBuscar };
    Ciclista.find({}).then(ciclistas=> 
        Ciclista.find(query).then(
        ciclista => {
            console.log(ciclista);        
            // Renderizar la vista de ciclistas después de enviar los ciclistas como respuesta
        
            //return res.render('DetalleCiclista.ejs', {ciclista: ciclista, ciclistas:ciclistas}); 
return res.render('DetalleCiclista.ejs', {  ciclista: ciclista,  ciclistas: ciclistas,rutaImagenesCiclistas: '/img_ciclistas/' 
});

            
        })
       )

       .catch(error => {
           // Manejamos errores
           console.error(error);
           res.status(500).json({ mensaje: 'Error interno del servidor' });
       });

}


/*
// Controlador para mostrar un ciclista específico
module.exports.mostrar_ciclista = (req, res) => {
     Ciclista.find(c => c.id === id)
        .then(ciclistas => {
            console.log(ciclistas);        
            // Renderizar la vista de ciclistas después de enviar los ciclistas como respuesta
        
            return res.render('detalleCiclista.ejs', { ciclista }); 
            
        })
        .catch(error => {
            // Manejamos errores
            console.error(error);
            res.status(500).json({ mensaje: 'Error interno del servidor' });
        });

}*/

