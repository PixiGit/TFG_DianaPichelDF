
// Se ejecuta cuando el DOM ha sido completamente cargado
document.addEventListener('DOMContentLoaded', () => {

  // Seleccionar el modal de edición de competición
  const modalCompeticion = new bootstrap.Modal(document.getElementById('modalCompeticion'));
  // Seleccionar el botón de actualizar dentro del modal de edición de competición
  const btnActualizar = document.querySelector('#modalCompeticion .btn-success');
  //const btnActualizar = document.querySelector('#btnEditarCompeticion');
  // Seleccionar el botón de nueva competición
  const btnNuevaCompeticion = document.querySelector('#btnNuevaCompeticion');

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
  on(document, 'click', '.btnEditarComp', e => {
    const fila = e.target.parentNode.parentNode;
    id_editar.value = fila.children[0].textContent.trim();
    console.log("fila.children[0].innerHTML: " + fila.children[0].textContent.trim());
    console.log("id_editar.value: " + id_editar.value);
    titulo_editar.value = fila.children[1].textContent.trim();
    lugar_editar.value = fila.children[2].textContent.trim();

    var date = createDateFromString(fila.children[3].textContent.trim());
    // Formatear la fecha para asignarla al input
    var formattedDate = date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2);

    fecha_editar.value = formattedDate;

    //fecha_editar.value = fila.children[2].innerHTML;
    enlace_editar.value = fila.children[4].textContent.trim();
    resultado_editar.value = fila.children[5].textContent.trim();
    modalCompeticion.show();
  });

  
});




// Agregar evento de clic para el botón "Nueva competición"
btnNuevaCompeticion.addEventListener('click', () => {
  const modalNuevaCompeticion = new bootstrap.Modal(document.getElementById('modalNuevaCompeticion'));
  modalNuevaCompeticion.show();
});


// Función para confirmar el borrado de una competición
function confirmDelete(competicionId) {
  if (confirm("¿Estás seguro de que quieres eliminar este registro?")) {
    window.location.href = "/backoffice/competiciones/borrar/" + competicionId;
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

