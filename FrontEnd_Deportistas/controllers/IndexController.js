var mongoose = require('mongoose'); 
//const Ciclista = require('../model/CiclistaModel');

// module.exports.listar_ciclistas = (req, res) => {
//     Ciclista.find({})
//         .then(ciclistas => {
//             console.log(ciclistas);
            
//             // Renderizar la vista con los ciclistas (necesarios para el menú)
//             return res.render('index.ejs',{ciclistas: ciclistas});
            
//         })
//         .catch(error => {
//             // Manejamos errores
//             console.error(error);
//             res.status(500).json({ mensaje: 'Error interno del servidor' });
//         });

// }

const Ciclista = require('../model/CiclistaModel');
const Noticia = require('../model/NoticiaModel');

module.exports.listar_ciclistas = async (req, res) => {
    try {
        const ciclistas = await Ciclista.find({});
        const noticias = await Noticia.find({});
        res.render('index.ejs', { ciclistas: ciclistas, noticias: noticias });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error interno del servidor');
    }
};
