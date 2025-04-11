
// Se ejecuta cuando el DOM ha sido completamente cargado
document.addEventListener('DOMContentLoaded', () => {

  // // Seleccionar el modal de edición de NOTICIA
  const modalNoticia = new bootstrap.Modal(document.getElementById('modalNoticia'));
 // // Seleccionar el botón de actualizar dentro del modal de edición de noticia
  const btnActualizarNoticia = document.querySelector('#modalNoticia .btn-success');
 // // Seleccionar el botón de nueva competición
  const btnNuevaNoticia = document.querySelector('#btnNuevaNoticia'); 

// Función para manejar eventos 
const on = (element, event, selector, handler) => {
 element.addEventListener(event, e => {
   //console.log("se está ejecutando el on");
   if (e.target.closest(selector)) {
     handler(e);
   }
 });
};


 // Agregar evento de clic para el botón de editar competición
 on(document, 'click', '.btnEditarNot', e => {
  const fila = e.target.parentNode.parentNode;
   //id_editar.value = fila.children[0].innerHTML;
   id_editar.value = fila.children[0].textContent.trim();
   console.log("fila.children[0].innerHTML: " + fila.children[0].textContent.trim());
   console.log("id_editar.value: " + id_editar.value);
   //var date=createDateFromString(fila.children[1].innerHTML); 
   var date = createDateFromString(fila.children[1].textContent.trim());
   // Formatear la fecha para asignarla al input
   var formattedDate = date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2);

   fechapub_editar.value =   formattedDate;

  //fechapub_editar.value = fila.children[1].innerHTML;
   titulo_editar.value = fila.children[2].textContent.trim();
  cuerpo_editar.value = fila.children[3].textContent.trim();
  foto_editar.value = fila.children[4].textContent.trim(); 
   modalNoticia.show();
});
// Agregar evento de clic para el botón "Actualizar" en el modal
// btnActualizar.addEventListener('click', () => {
//   document.querySelector('#modalCompeticion form').submit();
// });

 // // Agregar evento de clic para el botón "Actualizar" en el modal
 //  btnActualizarNoticia.addEventListener('click', () => {
 //   document.querySelector('#modalNoticia form').submit();
 //  });

});



// Agregar evento de clic para el botón "Nueva competición"
// btnNuevaCompeticion.addEventListener('click', () => {
//   const modalNuevaCompeticion = new bootstrap.Modal(document.getElementById('modalNuevaCompeticion'));
//   modalNuevaCompeticion.show();
// });

// Agregar evento de clic para el botón "Nueva competición"
btnNuevaNoticia.addEventListener('click', () => {
const modalNuevaNoticia = new bootstrap.Modal(document.getElementById('modalNuevaNoticia'));
modalNuevaNoticia.show();
});

// Función para confirmar el borrado de una competición
// function confirmDelete(competicionId) {
//   if (confirm("¿Estás seguro de que quieres eliminar este registro?")) {
//     window.location.href = "/borrar/" + competicionId;
//   }
// }

// Función para confirmar el borrado de una competición
function confirmDeleteNoticia(noticiaId) {
if (confirm("¿Estás seguro de que quieres eliminar este registro?")) {
  window.location.href = "/backoffice/noticias/borrar/" + noticiaId;
}
}


// Función auxiliar para convertir una cadena con formato dd/MM/yyyy a un objeto Date
function createDateFromString(dateString) {
// Dividir la cadena en día, mes y año
var parts = dateString.split('/');

// Crear un objeto Date
// El mes está basado en 0, por lo que necesitas restar 1 al mes
var date = new Date(parts[2], parts[1] - 1, parts[0]);

return date;
}

//Modifica el input de foto dependiendo del valor seleccionado en el selector de fichero en alta
function modificarFotoSeleccionada(){
const inputFileFoto = document.querySelector('#photo');  
const inputTextFoto = document.querySelector('#foto');

if(inputFileFoto.value!="" && inputFileFoto.files!=null && inputFileFoto.files[0]!=null){
 inputTextFoto.value=inputFileFoto.files[0].name;
}


}
//Modifica el input de foto dependiendo del valor seleccionado en el selector de fichero para edición
function modificarFotoSeleccionadaEditar(){
const inputFileFoto = document.querySelector('#photo_editar');  
const inputTextFoto = document.querySelector('#foto_editar');

if(inputFileFoto.value!="" && inputFileFoto.files!=null && inputFileFoto.files[0]!=null){
 inputTextFoto.value=inputFileFoto.files[0].name;
}


}
