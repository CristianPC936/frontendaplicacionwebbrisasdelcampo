document.getElementById('nav-toggle').addEventListener('click', function () {
    var sidebar = document.querySelector('.sidebar');
    sidebar.classList.toggle('hidden');
});

document.querySelector('.search-button').addEventListener('click', function () {
    const selectedOption = document.getElementById('search-options').value;

    // Limpiar la tabla antes de ejecutar la función de búsqueda
    limpiarTabla();

    if (selectedOption === 'asignados') {
        actualizarEncabezados('asignados'); // Actualizar encabezados para asignados
        buscarDocentesAsignados();
    } else if (selectedOption === 'noAsignados') {
        actualizarEncabezados('noAsignados'); // Actualizar encabezados para no asignados
        buscarDocentesNoAsignados();
    }
});

// Función para limpiar la tabla antes de las búsquedas
function limpiarTabla() {
    const tbody = document.getElementById('docentesTableBody');
    tbody.innerHTML = ''; // Limpia el cuerpo de la tabla
}

// Función para actualizar los encabezados de la tabla
function actualizarEncabezados(opcion) {
    const tableHead = document.querySelector('#docentesTable thead');
    tableHead.innerHTML = ''; // Limpiar encabezados

    const headerRow = document.createElement('tr');

    if (opcion === 'asignados') {
        // Encabezados para docentes asignados
        const nombresApellidosHeader = document.createElement('th');
        nombresApellidosHeader.textContent = 'Nombres y Apellidos';

        const nombreUsuarioHeader = document.createElement('th');
        nombreUsuarioHeader.textContent = 'Nombre de usuario';

        const gradoHeader = document.createElement('th');
        gradoHeader.textContent = 'Grado';

        const seccionHeader = document.createElement('th');
        seccionHeader.textContent = 'Sección';

        headerRow.appendChild(nombresApellidosHeader);
        headerRow.appendChild(nombreUsuarioHeader);
        headerRow.appendChild(gradoHeader);
        headerRow.appendChild(seccionHeader);
    } else if (opcion === 'noAsignados') {
        // Encabezados para docentes no asignados
        const nombresApellidosHeader = document.createElement('th');
        nombresApellidosHeader.textContent = 'Nombres y Apellidos';

        const nombreUsuarioHeader = document.createElement('th');
        nombreUsuarioHeader.textContent = 'Nombre de usuario';

        const asignarHeader = document.createElement('th');
        asignarHeader.textContent = ''; // Columna vacía para el botón de asignación

        headerRow.appendChild(nombresApellidosHeader);
        headerRow.appendChild(nombreUsuarioHeader);
        headerRow.appendChild(asignarHeader);
    }

    tableHead.appendChild(headerRow);
}

// Función para buscar docentes asignados
async function buscarDocentesAsignados() {
    try {
        const response = await fetch('../../backend/buscarDocentesAsignados.php');
        if (!response.ok) {
            throw new Error('Error al obtener los docentes asignados');
        }

        const docentes = await response.json();
        const tbody = document.getElementById('docentesTableBody');
        tbody.innerHTML = ''; // Limpia el contenido de la tabla

        docentes.forEach(docente => {
            const fila = document.createElement('tr');

            // Nombres y Apellidos
            const nombres = [
                docente.primerNombre || '',
                docente.segundoNombre || '',
                docente.tercerNombre || '',
                docente.primerApellido || '',
                docente.segundoApellido || ''
            ].join(' ').trim();

            const columnaNombres = document.createElement('td');
            columnaNombres.textContent = nombres;
            fila.appendChild(columnaNombres);

            // Nombre de Usuario
            const columnaNombreUsuario = document.createElement('td');
            columnaNombreUsuario.textContent = docente.nombreUsuario || '';
            fila.appendChild(columnaNombreUsuario);

            // Grado
            const columnaGrado = document.createElement('td');
            columnaGrado.textContent = docente.nombreGrado || '';
            fila.appendChild(columnaGrado);

            // Sección
            const columnaSeccion = document.createElement('td');
            columnaSeccion.textContent = docente.nombreSeccion || '';
            fila.appendChild(columnaSeccion);

            tbody.appendChild(fila);
        });
    } catch (error) {
        console.error('Error al buscar los docentes asignados:', error);
        alert('Hubo un error al buscar los docentes asignados.');
    }
}

// Función para buscar docentes no asignados
async function buscarDocentesNoAsignados() {
    try {
        const response = await fetch('../../backend/buscarDocentesNoAsignados.php');
        if (!response.ok) {
            throw new Error('Error al obtener los docentes no asignados');
        }

        const docentes = await response.json();
        const tbody = document.getElementById('docentesTableBody');
        tbody.innerHTML = ''; // Limpia el contenido de la tabla

        docentes.forEach(docente => {
            const fila = document.createElement('tr');

            // Nombres y Apellidos
            const nombres = [
                docente.primerNombre || '',
                docente.segundoNombre || '',
                docente.tercerNombre || '',
                docente.primerApellido || '',
                docente.segundoApellido || ''
            ].join(' ').trim();

            const columnaNombres = document.createElement('td');
            columnaNombres.textContent = nombres;
            fila.appendChild(columnaNombres);

            // Nombre de Usuario
            const columnaNombreUsuario = document.createElement('td');
            columnaNombreUsuario.textContent = docente.nombreUsuario || '';
            fila.appendChild(columnaNombreUsuario);

            // Columna oculta para idUsuario
            const inputIdUsuario = document.createElement('input');
            inputIdUsuario.type = 'hidden';
            inputIdUsuario.value = docente.idUsuario;
            fila.appendChild(inputIdUsuario);

            // Botón para asignar grado y sección
            const columnaAsignar = document.createElement('td');
            const botonAsignar = document.createElement('button');
            botonAsignar.textContent = 'Asignar Grado y Sección';
            botonAsignar.classList.add('assign-button', 'search-button');
            botonAsignar.addEventListener('click', function () {
                mostrarModalAsignacion(docente);
            });
            columnaAsignar.appendChild(botonAsignar);
            fila.appendChild(columnaAsignar);

            tbody.appendChild(fila);
        });
    } catch (error) {
        console.error('Error al buscar los docentes no asignados:', error);
        alert('Hubo un error al buscar los docentes no asignados.');
    }
}

// Función para mostrar el modal de asignación
function mostrarModalAsignacion(docente) {
    document.getElementById('assign-primerNombre').textContent = docente.primerNombre || '';
    document.getElementById('assign-segundoNombre').textContent = docente.segundoNombre || '';
    document.getElementById('assign-tercerNombre').textContent = docente.tercerNombre || '';
    document.getElementById('assign-primerApellido').textContent = docente.primerApellido || '';
    document.getElementById('assign-segundoApellido').textContent = docente.segundoApellido || '';
    document.getElementById('assign-nombreUsuario').textContent = docente.nombreUsuario || '';

    // Añadir idUsuario al modal
    const hiddenInput = document.createElement('input');
    hiddenInput.type = 'hidden';
    hiddenInput.id = 'idUsuarioModal';  // Campo oculto para almacenar idUsuario
    hiddenInput.value = docente.idUsuario;
    document.querySelector('.modal-content-delete').appendChild(hiddenInput);

    const modal = document.getElementById('assignModal');
    modal.classList.add('show');

    // Cargar grados y secciones en los selects
    cargarGrados();
    cargarSecciones();
}

// Función para cerrar el modal de asignación
function closeAssignModal() {
    const modal = document.getElementById('assignModal');
    modal.classList.remove('show');
    limpiarCamposModal();
}

// Función para limpiar los campos del modal
function limpiarCamposModal() {
    document.getElementById('grade').innerHTML = '';
    document.getElementById('section').innerHTML = '';
}

// Función para llenar el select con los grados
async function cargarGrados() {
    try {
        const response = await fetch('http://localhost:8888/.netlify/functions/leerGrado');
        
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
            option.value = grado.idGrado;
            option.textContent = grado.nombreGrado;
            selectGrado.appendChild(option);
        });
    } catch (error) {
        console.error('Error al cargar los grados:', error);
    }
}

// Función para llenar el select con las secciones
async function cargarSecciones() {
    try {
        const response = await fetch('http://localhost:8888/.netlify/functions/leerSeccion');
        
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
            option.value = seccion.idSeccion;
            option.textContent = seccion.nombreSeccion;
            selectSeccion.appendChild(option);
        });
    } catch (error) {
        console.error('Error al cargar las secciones:', error);
    }
}

document.querySelector('.assign-button-confirm').addEventListener('click', async function () {
    const idUsuario = document.getElementById('idUsuarioModal').value; // El idUsuario está en el modal ahora
    const idGrado = document.getElementById('grade').value;
    const idSeccion = document.getElementById('section').value;

    const data = {
        idUsuario: idUsuario,
        idGrado: idGrado,
        idSeccion: idSeccion
    };

    try {
        const response = await fetch('../../backend/asignarDocente.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        const result = await response.json();
        if (result.success) {
            alert('Docente asignado correctamente');
            closeAssignModal(); // Cierra el modal
        } else {
            alert(result.message);
        }
    } catch (error) {
        console.error('Error al asignar el docente:', error);
        alert('Hubo un error al asignar el docente.');
    }
});
