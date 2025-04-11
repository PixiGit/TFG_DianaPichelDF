// Importación de módulos necesarios

var mongoose = require('mongoose'); 
const Noticia = require('../model/NoticiaModel');
const Ciclista = require('../model/CiclistaModel');
// const noticiasController = require('../controllers/NoticiasController.js');



// Controlador para mostrar todos los noticias
module.exports.listar_noticias = (req, res) => {
  Ciclista.find({})
    .then(ciclistas => {
      Noticia.find({}).then(noticias => {
        return res.render('index.ejs', {
          ciclistas: ciclistas,
          noticias: noticias,
          rutaImagenesNoticias: '/img_noticias/'
        });
      });
    })
    .catch(error => {
      console.error(error);
      res.status(500).json({ mensaje: 'Error interno del servidor' });
    });
};

async function getNoticias(){

    const Items = await Noticia.find({});
    return Items;
  
  }


  module.exports.mostrar_noticia = (req, res) => {
    const idBuscar = req.params.id;
    console.log(idBuscar); 
    var query = { _id: idBuscar };
    Noticia.find({}).then(noticias=> 
        Noticia.find(query).then(
        noticia => {
            console.log(noticia);        
            // Renderizar la vista de noticias después de enviar los noticias como respuesta
        
            return res.render('index.ejs', {noticia: noticia, noticias:noticias,
                    rutaImagenesNoticias:'/img_noticias/' }); 
            
        })
       )

       .catch(error => {
           // Manejamos errores
           console.error(error);
           res.status(500).json({ mensaje: 'Error interno del servidor' });
       });

}


