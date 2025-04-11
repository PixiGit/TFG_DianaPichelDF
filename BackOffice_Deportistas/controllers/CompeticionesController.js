// Importación de módulos necesarios

var mongoose = require('mongoose'); 
const Competicion = require('../model/CompeticionModel');



// Controlador para mostrar todas las competiciones
module.exports.mostrar = (req, res) => {
    Competicion.find({})
        .then(competiciones => {
            console.log(competiciones);
            res.render('competiciones.ejs', { competiciones: competiciones });
        })
        .catch(error => {
            console.error(error);
            res.status(500).json({ mensaje: 'Error interno del servidor' });
        });
};

// Controlador para crear una competición
module.exports.crear = (req, res) => {
    const nuevaCompeticion = new Competicion({
        titulo: req.body.titulo,
        lugar: req.body.lugar,
        fecha: req.body.fecha,
        enlace: req.body.enlace,
        resultado: req.body.resultado,
    });
    nuevaCompeticion.save()
        .then(competicion => {
            console.log('Competición creada:', competicion);
            res.redirect('/backoffice/competiciones');
        })
        .catch(error => {
            console.error(error);
            res.status(500).json({ mensaje: 'Error al crear una competición' });
        });
};

// Controlador para editar una competición
module.exports.editar = (req, res) => {
    const id = req.body.id_editar.trim();
    const titulo = req.body.titulo_editar;
    const lugar = req.body.lugar_editar;
    const fecha = req.body.fecha_editar;
    const enlace = req.body.enlace_editar;
    const resultado = req.body.resultado_editar;
    Competicion.findByIdAndUpdate(id, { titulo, lugar, fecha, enlace, resultado }, { new: true })
        .then(competicion => {
            if (!competicion) {
                return res.status(404).json({ mensaje: 'Competición no encontrada' });
            }
            res.redirect('/backoffice/competiciones');
        })
        .catch(error => {
            console.error(error);
            res.status(500).json({ mensaje: 'Error al actualizar una competición' });
        });
};

// Controlador para borrar una competición
module.exports.borrar = (req, res) => {
    const id = req.params.id;
    Competicion.findByIdAndDelete(id)
        .then(competicion => {
            if (!competicion) {
                return res.status(404).json({ mensaje: 'Competición no encontrada' });
            }
            res.redirect('/backoffice/competiciones');
        })
        .catch(error => {
            console.error(error);
            res.status(500).json({ mensaje: 'Error al borrar una competición' });
        });
};
