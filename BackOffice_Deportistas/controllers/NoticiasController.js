
// Importación de módulos necesarios

var mongoose = require('mongoose'); 
const Noticia = require('../model/NoticiaModel');
const multer = require('multer');
const path = require('path');

// Configuración de Multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '../../img_noticias/'); // Ruta donde se guardarán las imágenes. La ruta es relativa fuera del proyecto (sería compartida por las dos webs)
    },
    filename: function (req, file, cb) {        
      cb(null, file.originalname); // Nombre del archivo
    }
  });
  
  const upload = multer({ storage: storage });


// Controlador para mostrar todas las noticias
module.exports.mostrar = (req, res) => {
    Noticia.find({})
        .then(noticias => {
            console.log(noticias);
            res.render('noticias.ejs', { noticias: noticias });
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

// Controlador para crear una noticia
// module.exports.crear = (req, res) => {
//     const nuevaNoticia = new Noticia({
//         fechapub: req.body.fechapub, 
//         titulo: req.body.titulo,
//         cuerpo: req.body.cuerpo,
//     });
    
//     nuevaNoticia.save()
//         .then(noticia => {
//             console.log('Noticia creada:', noticia);
//             res.redirect('noticias');
//         })
//         .catch(error => {
//             console.error(error);
//             res.status(500).json({ mensaje: 'Error al crear una noticia' });
//         });
// };

// Controlador para crear un noticia
module.exports.crear = [    
    upload.single('photo'),// Manejo de la carga de una sola imagen con el nombre 'foto'
    (req, res) => {
        console.log(req.file, req.body);
    console.log("Entra en crear");
    console.log(req.body);
      // Crear un nuevo noticia con los datos recibidos en la solicitud
      console.log(req.file);
     
    const nuevoNoticia = new Noticia({
     
        fechapub: req.body.fechapub, 
        titulo: req.body.titulo,
        cuerpo: req.body.cuerpo,
        foto: req.body.foto,
    });

    console.log("Noticia a crear");
    console.log(nuevoNoticia);

    // Guardar el Noticia en la base de datos
    nuevoNoticia.save()
        .then(noticia => {
            console.log('Noticia creado:', noticia);
            res.redirect('/backoffice/noticias');
        })
        .catch(error => {
             // Manejamos errores
            console.error(error);
            res.status(500).json({ mensaje: 'Error al crear un noticia' });
        });
}];


// Controlador para editar una noticia
// module.exports.editar = (req, res) => {
//     const id = req.body.id_editar.trim();
//     const fechapub = req.body.fechapub_editar;
//     const titulo = req.body.titulo_editar;
//     const cuerpo = req.body.cuerpo_editar;
//     Noticia.findByIdAndUpdate(id, { fechapub, titulo, cuerpo }, { new: true })
//         .then(noticia => {
//             if (!noticia) {
//                 return res.status(404).json({ mensaje: 'Noticia no encontrada' });
//             }
//             res.redirect('/backoffice/noticias');
//         })
//         .catch(error => {
//             console.error(error);
//             res.status(500).json({ mensaje: 'Error al actualizar una noticia' });
//         });
// };

// Controlador para editar un noticia específico
module.exports.editar = [    
    upload.single('photo_editar'),// Manejo de la carga de una sola imagen con el nombre 'photo_editar'
(req, res) => {
    // Extraer los datos de la solicitud
    const id = req.body.id_editar.trim();
    const fechapub = req.body.fechapub_editar;
    const titulo = req.body.titulo_editar;
    const cuerpo = req.body.cuerpo_editar;
    const foto = req.body.foto_editar;


    // Buscar y actualizar al noticia en la base de datos
    Noticia.findByIdAndUpdate(id, { fechapub, titulo, cuerpo,foto }, { new: true })
        .then(noticia=> {
            // Comprobar si el noticia existe
            if (!noticia) {
                return res.status(404).json({ mensaje: 'Noticia no encontrada' });
            }
             // Redireccionar al inicio
            res.redirect('/backoffice/noticias');
        })
        .catch(error => {
            // Manejamos errores
            console.error(error);
            res.status(500).json({ mensaje: 'Error al actualizar una noticia' });
        });
}];


// Controlador para borrar una noticia
module.exports.borrar = (req, res) => {
    const id = req.params.id;
    Noticia.findByIdAndDelete(id)
        .then(noticia => {
            if (!noticia) {
                return res.status(404).json({ mensaje: 'Noticia no encontrada' });
            }
            res.redirect('/backoffice/noticias');
        })
        .catch(error => {
            console.error(error);
            res.status(500).json({ mensaje: 'Error al borrar una noticia' });
        });
};
