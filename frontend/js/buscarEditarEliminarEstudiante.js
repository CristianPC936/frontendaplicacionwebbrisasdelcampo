document.getElementById('nav-toggle').addEventListener('click', function() {
    var sidebar = document.querySelector('.sidebar');
    sidebar.classList.toggle('hidden'); // Alterna la clase 'hidden' para desplazar el aside
});

document.addEventListener('DOMContentLoaded', function () {
    const userFooterBtn = document.getElementById('toggleDropdown');
    const userText = userFooterBtn.querySelector('.user-text'); // Seleccionamos solo el texto del botón
    const originalUsername = userFooterBtn.getAttribute('data-username'); // Guardamos el valor del nombre de usuario original

    // Función para hacer la transición suave del texto
    function transitionButton(newText) {
        userText.style.transition = 'opacity 0.3s'; // Transición suave para el texto
        userText.style.opacity = '0'; // Desaparecer el texto actual

        setTimeout(() => {
            userText.textContent = newText; // Cambiar el texto
            userText.style.opacity = '1'; // Mostrar el nuevo texto
        }, 300); // Tiempo de la transición de 0.3 segundos
    }

    // Mostrar "Cerrar sesión" en lugar del nombre de usuario
    userFooterBtn.addEventListener('click', function (event) {
        event.stopPropagation(); // Detener la propagación del evento para no activar el cierre inmediato
        if (userText.textContent === 'Cerrar sesión') {
            window.location.href = '../../backend/logout.php'; // Redirigir al logout
        } else {
            transitionButton('Cerrar sesión');
        }
    });

    // Si el usuario hace clic en cualquier parte de la página, restaurar el nombre del usuario
    document.addEventListener('click', function () {
        if (userText.textContent === 'Cerrar sesión') {
            transitionButton(originalUsername); // Restauramos el nombre de usuario original desde el atributo
        }
    });

    // Detener la propagación del evento cuando el usuario haga clic en el botón de usuario
    userFooterBtn.addEventListener('click', function (event) {
        event.stopPropagation();
    });
});

// Función para llenar el select con los grados
async function cargarGrados() {
    try {
        const response = await fetch('https://as0o0gl0d5.execute-api.us-east-1.amazonaws.com/leerGrado');
        
        if (!response.ok) {
            throw new Error('Error en la solicitud');
        }
        
        const grados = await response.json();
        const selectGrado = document.getElementById('grade');
        
        // Limpiar cualquier opción previa 
        selectGrado.innerHTML = '';

        // Iterar sobre los grados y crear opciones
        grados.forEach(grado => {
            const option = document.createElement('option');
            option.value = grado.idGrado; // Usar idGrado como el valor de la opción
            option.textContent = grado.nombreGrado; // Mostrar nombreGrado como el texto de la opción
            selectGrado.appendChild(option);
        });
    } catch (error) {
        console.error('Error al cargar los grados:', error);
    }
}

// Función para llenar el select con las secciones
async function cargarSecciones() {
    try {
        const response = await fetch('https://as0o0gl0d5.execute-api.us-east-1.amazonaws.com/leerSeccion');
        
        if (!response.ok) {
            throw new Error('Error en la solicitud');
        }
        
        const secciones = await response.json();
        const selectSeccion = document.getElementById('section');
        
        // Limpiar cualquier opción previa
        selectSeccion.innerHTML = '';

        // Iterar sobre las secciones y crear opciones
        secciones.forEach(seccion => {
            const option = document.createElement('option');
            option.value = seccion.idSeccion; // Usar idSeccion como el valor de la opción
            option.textContent = seccion.nombreSeccion; // Mostrar nombreSeccion como el texto de la opción
            selectSeccion.appendChild(option);
        });
    } catch (error) {
        console.error('Error al cargar las secciones:', error);
    }
}

async function buscarEstudiantes(event) {
    event.preventDefault(); // Evitar que se recargue la página al hacer clic en el botón

    const button = document.querySelector('.search-button'); // Seleccionar el botón de búsqueda
    button.disabled = true; // Deshabilitar el botón
    button.style.opacity = "0.5"; // Atenuar el botón

    // Limpiar la tabla antes de llenarla con los nuevos datos
    const tbody = document.querySelector('.attendance-table tbody');
    tbody.innerHTML = ''; // Limpiar cualquier fila previa

    // Obtener los valores de los selects de grado y sección
    const idGrado = document.getElementById('grade').value;
    const idSeccion = document.getElementById('section').value;
    const cicloEscolar = new Date().getFullYear(); // Obtener el año en curso

    // Construir la URL con los parámetros idGrado, idSeccion y cicloEscolar
    const url = `https://as0o0gl0d5.execute-api.us-east-1.amazonaws.com/leerAlumnoConCorreo?idGrado=${idGrado}&idSeccion=${idSeccion}&cicloEscolar=${cicloEscolar}`;

    try {
        // Realizar la solicitud fetch
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Error al obtener los estudiantes');
        }

        // Parsear la respuesta JSON
        const estudiantes = await response.json();

        // Iterar sobre los estudiantes y agregar filas a la tabla
        estudiantes.forEach(estudiante => {
            const fila = document.createElement('tr');

            // Columna oculta: idAlumno
            const inputIdAlumno = document.createElement('input');
            inputIdAlumno.type = 'hidden';
            inputIdAlumno.value = estudiante.idAlumno;
            fila.appendChild(inputIdAlumno);

            // Función para limpiar valores null
            const limpiarNombres = (nombre) => nombre !== null ? nombre : '';

            // Columna 1: Nombres completos (sin valores null)
            const columnaNombre = document.createElement('td');
            columnaNombre.textContent = `${limpiarNombres(estudiante.primerNombre)} ${limpiarNombres(estudiante.segundoNombre)} ${limpiarNombres(estudiante.tercerNombre)} ${limpiarNombres(estudiante.primerApellido)} ${limpiarNombres(estudiante.segundoApellido)}`.trim();
            fila.appendChild(columnaNombre);

            // Columna 2: Correo electrónico
            const columnaCorreo = document.createElement('td');
            columnaCorreo.textContent = estudiante.correoElectronico || 'Sin correo';
            fila.appendChild(columnaCorreo);

            // Columna 3: Clave del alumno
            const columnaClave = document.createElement('td');
            columnaClave.textContent = estudiante.claveAlumno;
            fila.appendChild(columnaClave);

            // Columna 4: Botón "Editar"
            const columnaEditar = document.createElement('td');
            const botonEditar = document.createElement('button');
            botonEditar.className = 'edit-button';
            botonEditar.textContent = 'Editar';
            botonEditar.addEventListener('click', function () {
                openEditModal(estudiante);
            });
            columnaEditar.appendChild(botonEditar);
            fila.appendChild(columnaEditar);

            // Columna 5: Botón "Dar de Baja"
            const columnaEliminar = document.createElement('td');
            const botonEliminar = document.createElement('button');
            botonEliminar.className = 'delete-button';
            botonEliminar.textContent = 'Dar de Baja';
            botonEliminar.addEventListener('click', function () {
                openDeleteModal(estudiante);
            });
            columnaEliminar.appendChild(botonEliminar);
            fila.appendChild(columnaEliminar);

            // Añadir la fila a la tabla
            tbody.appendChild(fila);
        });
    } catch (error) {
        console.error('Error al buscar los estudiantes:', error);
        alert('Hubo un error al buscar los estudiantes.');
    } finally {
        // Habilitar el botón nuevamente y restaurar su opacidad
        button.disabled = false;
        button.style.opacity = "1";
    }
}

// Asignar la función al botón "Buscar Estudiantes"
document.querySelector('.search-button').addEventListener('click', buscarEstudiantes);

// Function to open the modal and fill the form with student data
function openEditModal(student) {
    const modal = document.getElementById('editModal');
    const form = modal.querySelector('form');
    const saveButton = form.querySelector('.save-button');

    // Fill the form with the student data
    form.querySelector('#edit-primerNombre').value = student.primerNombre;
    form.querySelector('#edit-segundoNombre').value = student.segundoNombre || '';
    form.querySelector('#edit-tercerNombre').value = student.tercerNombre || '';
    form.querySelector('#edit-primerApellido').value = student.primerApellido;
    form.querySelector('#edit-segundoApellido').value = student.segundoApellido || '';

    // Mostrar el modal agregando la clase 'show'
    modal.classList.add('show');

    // Remover cualquier listener anterior para evitar múltiples envíos
    saveButton.replaceWith(saveButton.cloneNode(true));  // Clonar el botón para remover los listeners antiguos
    const newSaveButton = form.querySelector('.save-button');

    // Agregar un nuevo listener para guardar cambios
    newSaveButton.addEventListener('click', function () {
        guardarCambios(student.idAlumno);
    });
}

// Function to close the modal
function closeModal() {
    const modal = document.getElementById('editModal');
    modal.classList.remove('show'); // Ocultar el modal removiendo la clase 'show'
}

// Function to open the delete modal and show student data for deletion
function openDeleteModal(student) {
    const modal = document.getElementById('deleteModal');
    
    // Fill in the student data into the modal
    document.getElementById('delete-primerNombre').textContent = student.primerNombre;
    document.getElementById('delete-segundoNombre').textContent = student.segundoNombre || '';
    document.getElementById('delete-tercerNombre').textContent = student.tercerNombre || '';
    document.getElementById('delete-primerApellido').textContent = student.primerApellido;
    document.getElementById('delete-segundoApellido').textContent = student.segundoApellido || '';
    document.getElementById('delete-claveAlumno').textContent = student.claveAlumno;

    // Show the modal
    modal.classList.add('show');

    // Add the delete event to the delete button
    const deleteButton = modal.querySelector('.delete-button-confirm');
    deleteButton.replaceWith(deleteButton.cloneNode(true));  // Remove old listeners
    const newDeleteButton = modal.querySelector('.delete-button-confirm');

    // When the delete button is clicked, call the delete function
    newDeleteButton.addEventListener('click', function () {
        eliminarAlumno(student.idAlumno);
    });
}

// Function to close the delete modal
function closeDeleteModal() {
    const modal = document.getElementById('deleteModal');
    modal.classList.remove('show'); // Ocultar el modal de eliminación
}

// Attach the event listener to the cancel button for deletion
document.querySelector('.cancel-button-delete').addEventListener('click', closeDeleteModal);

// Function to validate and save changes
async function guardarCambios(idAlumno) {
    const modal = document.getElementById('editModal');
    const form = modal.querySelector('form');
    const button = modal.querySelector('.save-button'); // Seleccionar el botón "Guardar"

    button.disabled = true; // Deshabilitar el botón
    button.style.opacity = "0.5"; // Atenuar el botón

    // Obtener valores de los inputs
    const primerNombre = form.querySelector('#edit-primerNombre').value;
    const segundoNombre = form.querySelector('#edit-segundoNombre').value;
    const tercerNombre = form.querySelector('#edit-tercerNombre').value;
    const primerApellido = form.querySelector('#edit-primerApellido').value;
    const segundoApellido = form.querySelector('#edit-segundoApellido').value;

    // Expresión regular para permitir solo letras (incluyendo tildes y ñ) y espacios
    const nameRegex = /^[A-Za-zÀ-ÿ\s]+$/;

    // Validación de primer nombre
    if (!primerNombre || !nameRegex.test(primerNombre)) {
        alert('Por favor ingrese un primer nombre válido.');
        button.disabled = false; // Restaurar el botón
        button.style.opacity = "1";
        return;
    }

    // Validación de primer apellido
    if (!primerApellido || !nameRegex.test(primerApellido)) {
        alert('Por favor ingrese un primer apellido válido.');
        button.disabled = false; // Restaurar el botón
        button.style.opacity = "1";
        return;
    }

    // Validación de segundo nombre
    if (segundoNombre && !nameRegex.test(segundoNombre)) {
        alert('Por favor ingrese un segundo nombre válido.');
        button.disabled = false; // Restaurar el botón
        button.style.opacity = "1";
        return;
    }

    // Validación de tercer nombre
    if (tercerNombre && !nameRegex.test(tercerNombre)) {
        alert('Por favor ingrese un tercer nombre válido.');
        button.disabled = false; // Restaurar el botón
        button.style.opacity = "1";
        return;
    }

    // Validación de segundo apellido
    if (segundoApellido && !nameRegex.test(segundoApellido)) {
        alert('Por favor ingrese un segundo apellido válido.');
        button.disabled = false; // Restaurar el botón
        button.style.opacity = "1";
        return;
    }

    // Crear objeto JSON con los datos del estudiante
    const estudiante = {
        idAlumno: idAlumno,
        primerNombre: primerNombre,
        segundoNombre: segundoNombre || '',
        tercerNombre: tercerNombre || '',
        primerApellido: primerApellido,
        segundoApellido: segundoApellido || ''
    };

    try {
        // Realizar solicitud fetch para guardar los cambios
        const response = await fetch('https://15eqv9i01e.execute-api.us-east-1.amazonaws.com/editarAlumno', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(estudiante)
        });

        if (response.ok) {
            alert('Los cambios han sido guardados.');
            closeModal(); // Cerrar modal después de guardar cambios
        } else {
            alert('Hubo un error al guardar los cambios.');
        }
    } catch (error) {
        console.error('Error al guardar los cambios:', error);
        alert('Hubo un error al intentar guardar los cambios.');
    } finally {
        // Restaurar el botón al finalizar
        button.disabled = false;
        button.style.opacity = "1";
    }
}

// Function to delete a student
async function eliminarAlumno(idAlumno) {
    const modal = document.getElementById('deleteModal');
    const button = modal.querySelector('.delete-button-confirm'); // Seleccionar el botón "Eliminar"

    button.disabled = true; // Deshabilitar el botón
    button.style.opacity = "0.5"; // Atenuar el botón

    try {
        // Enviar la solicitud para eliminar el alumno
        const response = await fetch('https://85zywfrnle.execute-api.us-east-1.amazonaws.com/eliminarAlumno', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ idAlumno: idAlumno })
        });

        if (response.ok) {
            alert('El estudiante ha sido dado de baja exitosamente.');
            closeDeleteModal(); // Cerrar el modal después de la eliminación
        } else {
            alert('Hubo un error al dar de baja al estudiante.');
        }
    } catch (error) {
        console.error('Error al dar de baja al estudiante:', error);
        alert('Hubo un error al intentar dar de baja al estudiante.');
    } finally {
        // Habilitar el botón nuevamente y restaurar su opacidad
        button.disabled = false;
        button.style.opacity = "1";
    }
}

// Attach the event listener to the cancel button for editing
document.querySelector('.cancel-button').addEventListener('click', closeModal);

// Ejecutar las funciones cuando se carga la página
window.addEventListener('load', function() {
    cargarGrados();
    cargarSecciones();
    
    // Asegurarse de que los modales estén ocultos al cargar la página
    const editModal = document.getElementById('editModal');
    const deleteModal = document.getElementById('deleteModal');
    editModal.classList.remove('show'); // Asegurar que el modal de edición esté oculto
    deleteModal.classList.remove('show'); // Asegurar que el modal de eliminación esté oculto
});

