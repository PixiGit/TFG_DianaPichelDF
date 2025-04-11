// Importación de módulos necesarios

var mongoose = require('mongoose'); 
const Ciclista = require('../model/CiclistaModel');
const multer = require('multer');
const path = require('path');


//const upload = multer({ dest: 'img_ciclistas/' })

// Configuración de Multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '../../img_ciclistas/'); // Ruta donde se guardarán las imágenes. La ruta es relativa fuera del proyecto (sería compartida por las dos webs)
    },
    filename: function (req, file, cb) {        
      cb(null, file.originalname); // Nombre del archivo
    }
  });
  
  const upload = multer({ storage: storage });


// Controlador para mostrar todos los ciclistas
module.exports.listar_ciclistas = (req, res) => {
    Ciclista.find({})
        .then(ciclistas => {
            console.log(ciclistas);
            
            // Renderizar la vista de ciclistas después de enviar los ciclistas como respuesta
        return res.render('ciclistas.ejs',{ciclistas: ciclistas});
            
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
    Ciclista.find(query).then(
        ciclista => {
            console.log(ciclista);        
            // Renderizar la vista de ciclistas después de enviar los ciclistas como respuesta
        
            return res.render('DetalleCiclista.ejs', {ciclista: ciclista}); 
            
        }
    )

       .catch(error => {
           // Manejamos errores
           console.error(error);
           res.status(500).json({ mensaje: 'Error interno del servidor' });
       });

}




// Controlador para crear un ciclista
module.exports.crear = [    
    upload.single('photo'),// Manejo de la carga de una sola imagen con el nombre 'foto'
    async (req, res) => {
        try{
        console.log(req.file, req.body);
    console.log("Entra en crear");
    console.log(req.body);
      // Crear un nuevo ciclista con los datos recibidos en la solicitud
      console.log(req.file);
      // Validación de datos
      if (!req.body.nombre || !req.body.equipo || !req.body.nacionalidad) {
        return res.status(400).json({ mensaje: 'Todos los campos obligatorios deben estar llenos' });
    }


    const nuevoCiclista = new Ciclista({
        nombre: req.body.nombre,
        foto: req.body.foto,        
        altura: req.body.altura,
        equipo: req.body.equipo,
        historial: req.body.historial,
        peso: req.body.peso,
        ultimo_palmares: req.body.palmares,
        nacionalidad: req.body.nacionalidad,
        fecha_nacimiento: req.body.fecha_nac
    });

    console.log("Ciclista a crear");
    console.log(nuevoCiclista);

    // Guardar el ciclista en la base de datos
    await nuevoCiclista.save()
        .then(ciclista => {
            console.log('Ciclista creado:', ciclista);
            res.redirect('/backoffice/ciclistas');
        })
        .catch(error => {
             // Manejamos errores
            console.error(error);
            res.status(500).json({ mensaje: 'Error al crear un ciclista' });
        });
    } catch (error) {
        console.error('❌ Error al crear ciclista:', error);
        res.status(500).json({ mensaje: 'Error interno del servidor' });
    }
}];





// Controlador para editar un ciclista específico
module.exports.editar = [    
    upload.single('photo_editar'),// Manejo de la carga de una sola imagen con el nombre 'photo_editar'
(req, res) => {
    // Extraer los datos de la solicitud
    const id = req.body.id_editar.trim();
    const nombre = req.body.nombre_editar;
    const fecha_nacimiento = req.body.fecha_nac_editar;
    const altura = req.body.altura_editar;
    const equipo = req.body.equipo_editar;
    const historial = req.body.historial_editar;
    const peso = req.body.peso_editar;
    const ultimo_palmares = req.body.palmares_editar;
    const nacionalidad = req.body.nacionalidad_editar;
    const foto = req.body.foto_editar;


    // Buscar y actualizar al ciclista en la base de datos
    Ciclista.findByIdAndUpdate(id, { nombre,fecha_nacimiento,foto,nacionalidad,altura,equipo,historial,peso,ultimo_palmares }, { new: true })
        .then(ciclista => {
            // Comprobar si el ciclista existe
            if (!ciclista) {
                return res.status(404).json({ mensaje: 'Ciclista no encontrado' });
            }
             // Redireccionar al inicio
            res.redirect('/backoffice/ciclistas');
        })
        .catch(error => {
            // Manejamos errores
            console.error(error);
            res.status(500).json({ mensaje: 'Error al actualizar un ciclista' });
        });
}];


// Controlador para borrar un ciclista específico
module.exports.borrar = (req, res) => {
    // Extraer el ID del ciclista de los parámetros de la solicitud
    const id = req.params.id;
    // Buscar y borrar el ciclista en la base de datos
    Ciclista.findByIdAndDelete(id)
        .then(ciclista => {
            // Comprobar si el ciclista existe
            if (!ciclista) {
                return res.status(404).json({ mensaje: 'Ciclista no encontrado' });
            }
            // Redireccionar al inicio
            res.redirect('/backoffice/ciclistas');
        })
        .catch(error => {
            // Manejamos errores
            console.error(error);
            res.status(500).json({ mensaje: 'Error al borrar un ciclista' });
        });
};



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

