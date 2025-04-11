
// Se ejecuta cuando el DOM ha sido completamente cargado
document.addEventListener('DOMContentLoaded', () => {

  // Seleccionar el modal de edición de ciclista
  const modalCiclista = new bootstrap.Modal(document.getElementById('modalCiclista'));
  // Seleccionar el botón de actualizar dentro del modal de edición de ciclista
  const btnActualizar = document.querySelector('#modalCiclista .btn-success');
  // Seleccionar el botón de nuevo ciclista
  const btnNuevoCiclista = document.querySelector('#btnNuevoCiclista'); 

  // Función para manejar eventos 
 const on = (element, event, selector, handler) => {
    element.addEventListener(event, e => {
      //console.log("se está ejecutando el on");
      if (e.target.closest(selector)) {
        handler(e);
      }
    });
  };


 // Agregar evento de clic para el botón de editar ciclista
  on(document, 'click', '.btnEditar', e => {
    const fila = e.target.parentNode.parentNode;
    id_editar.value = fila.children[0].innerHTML;
    nombre_editar.value = fila.children[1].innerHTML;
    var date=createDateFromString(fila.children[2].innerHTML); 
     // Formatear la fecha para asignarla al input
     var formattedDate = date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2);

    fecha_nac_editar.value =   formattedDate;
    console.log(date);
    altura_editar.value = fila.children[3].innerHTML;
    equipo_editar.value = fila.children[4].innerHTML;
    historial_editar.value = fila.children[5].innerHTML;
    peso_editar.value = fila.children[6].innerHTML;
    palmares_editar.value = fila.children[7].innerHTML;
    nacionalidad_editar.value = fila.children[8].innerHTML;
    foto_editar.value = fila.children[9].innerHTML;    
    modalCiclista.show();
  });

  // Agregar evento de clic para el botón "Actualizar" en el modal
  btnActualizar.addEventListener('click', () => {
    document.querySelector('#modalCiclista form').submit();
  });

// Agregar evento botón "Nuevo ciclista"
  btnNuevoCiclista.addEventListener('click', () => {
    const modalNuevoCiclista = new bootstrap.Modal(document.getElementById('modalNuevoCiclista'));
    modalNuevoCiclista.show();
  });
});

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



// Función para confirmar el borrado de un ciclista
function confirmDelete(ciclistaId) {
  if (confirm("¿Estás seguro de que quieres eliminar este registro?")) {
    window.location.href = "/backoffice/ciclistas/borrar/" + ciclistaId;
  }
}

