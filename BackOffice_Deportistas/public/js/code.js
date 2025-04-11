// Se ejecuta cuando el DOM ha sido completamente cargado
document.addEventListener('DOMContentLoaded', () => {

  // Seleccionar el modal de edición de competición
  const modalCompeticion = new bootstrap.Modal(document.getElementById('modalCompeticion'));
  // Seleccionar el botón de actualizar dentro del modal de edición de competición
  const btnActualizar = document.querySelector('#modalCompeticion .btn-primary');
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




  // Función para manejar eventos 
/*const on = (element, event, selector, handler) => {
  element.addEventListener(event, e => {
    if (e.target.closest(selector)) {
      // Verificar si el formulario de edición está presente
      const formEditar = document.querySelector('#formEditar');
      if (formEditar) {
        // Mostrar el modal de edición solo si el formulario está presente
        handler(e);
      }
    }
  });
};*/


 // Agregar evento de clic para el botón de editar competición
  on(document, 'click', '.btnEditar', e => {
    const fila = e.target.parentNode.parentNode;
    id_editar.value = fila.children[0].innerHTML;
    lugar_editar.value = fila.children[1].innerHTML;
    fecha_editar.value = fila.children[2].innerHTML;
    enlace_editar.value = fila.children[3].innerHTML;
    resultado_editar.value = fila.children[4].innerHTML;
    modalCompeticion.show();
  });

  // Agregar evento de clic para el botón "Actualizar" en el modal
  btnActualizar.addEventListener('click', () => {
    document.querySelector('#modalCompeticion form').submit();
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
    window.location.href = "/borrar/" + competicionId;
  }
}

