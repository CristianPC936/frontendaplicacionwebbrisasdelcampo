document.getElementById('nav-toggle').addEventListener('click', function() {
    var sidebar = document.querySelector('.sidebar');
    sidebar.classList.toggle('hidden'); // Alterna la clase 'hidden' para desplazar el aside
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

        // Ejecutar cargarCursos después de cargar los grados
        cargarCursos();
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

// Función para cargar los cursos cuando cambia el grado
async function cargarCursos() {
    const selectGrado = document.getElementById('grade');
    const selectCurso = document.getElementById('course');

    // Obtener el idGrado seleccionado
    const idGrado = selectGrado.value;

    try {
        // Hacer la solicitud fetch a la función leerCurso con el idGrado
        const response = await fetch(`https://as0o0gl0d5.execute-api.us-east-1.amazonaws.com/leerCurso?idGrado=${idGrado}`);

        if (!response.ok) {
            throw new Error('Error en la solicitud de cursos');
        }

        const cursos = await response.json();

        // Limpiar las opciones previas del select de cursos
        selectCurso.innerHTML = '';

        // Iterar sobre los cursos y crear opciones
        cursos.forEach(curso => {
            const option = document.createElement('option');
            option.value = curso.idCurso; // Usar idCurso como el valor de la opción
            option.textContent = curso.nombreCurso; // Mostrar nombreCurso como el texto de la opción
            selectCurso.appendChild(option);
        });
    } catch (error) {
        console.error('Error al cargar los cursos:', error);
    }
}
// Función para listar las notas y realizar las solicitudes fetch
async function listarNotas() {
    const button = document.querySelector('.search-button');
    button.disabled = true; // Deshabilitar el botón
    button.style.opacity = "0.5"; // Atenuar el botón

    // Limpiar la tabla antes de llenarla
    const tbody = document.querySelector('.attendance-table tbody');
    tbody.innerHTML = ''; // Limpiar cualquier fila previa

    const idGrado = document.getElementById('grade').value;
    const idSeccion = document.getElementById('section').value;
    const idCurso = document.getElementById('course').value;
    const bimestre = document.getElementById('bimester').value;
    const cicloEscolar = new Date().getFullYear(); // Obtener el año en curso

    try {
        // Primera solicitud fetch: verificar si ya existen notas registradas
        const urlNotas = `https://as0o0gl0d5.execute-api.us-east-1.amazonaws.com/leerNota?idCurso=${idCurso}&bimestre=${bimestre}&idGrado=${idGrado}&idSeccion=${idSeccion}`;
        const responseNotas = await fetch(urlNotas);
        
        if (!responseNotas.ok) {
            throw new Error('Error en la solicitud de notas');
        }
        
        const dataNotas = await responseNotas.json();
        
        if (dataNotas.length > 0) {

            // Iterar sobre las notas y crear filas para la tabla
            dataNotas.forEach(notaData => {
                const fila = document.createElement('tr');
                
                // Columna oculta: idNotas
                const inputIdNotas = document.createElement('input');
                inputIdNotas.type = 'hidden';
                inputIdNotas.value = notaData.idNotas;
                fila.appendChild(inputIdNotas);

                // Filtrar los nombres y apellidos que no sean null o vacíos
                const nombresCompletos = [
                    notaData.primerNombre,
                    notaData.segundoNombre,
                    notaData.tercerNombre,
                    notaData.primerApellido,
                    notaData.segundoApellido
                ].filter(Boolean).join(' '); // Filtrar valores nulos/vacíos y unir con espacio

                // Columna 1: Nombres completos
                const columnaNombre = document.createElement('td');
                columnaNombre.textContent = nombresCompletos;
                fila.appendChild(columnaNombre);
                
                // Columna 2: Clave del alumno
                const columnaClave = document.createElement('td');
                columnaClave.textContent = notaData.claveAlumno;
                fila.appendChild(columnaClave);
                
                // Columna 3: Input para la nota
                const columnaNota = document.createElement('td');
                const inputNota = document.createElement('input');
                inputNota.type = 'text';
                inputNota.value = notaData.nota; // Mostrar la nota existente
                columnaNota.appendChild(inputNota);
                fila.appendChild(columnaNota);
                
                // Añadir la fila a la tabla
                tbody.appendChild(fila);
            });
        } else {
            alert("No existe un registro de calificaciones para este grado, sección, curso y bimestre.");
        }
    } catch (error) {
        console.error('Error al listar las notas:', error);
    } finally {
        // Habilitar el botón nuevamente y restaurar su opacidad
        button.disabled = false;
        button.style.opacity = "1";
    }
}

// Función para guardar las notas (edición)
async function guardarNotas() {
    const button = document.querySelector('.save-button');
    button.disabled = true; // Deshabilitar el botón
    button.style.opacity = "0.5"; // Atenuar el botón

    // Obtener todas las filas de la tabla de notas
    const filas = document.querySelectorAll('.attendance-table tbody tr');
    
    // Crear un array para almacenar las notas de cada alumno
    const notas = [];
    let notasInvalidas = false; // Variable para marcar si alguna nota es inválida

    // Recorrer cada fila de la tabla para obtener los datos de las notas
    filas.forEach(fila => {
        const idNotas = fila.querySelector('input[type="hidden"]').value; // Obtener el idNotas de la columna oculta
        const nota = fila.querySelector('input[type="text"]').value.trim(); // Obtener el valor de la nota del input

        // Validaciones de la nota
        if (isNaN(nota) || !Number.isInteger(Number(nota))) {
            alert(`Alguna nota tiene un error`);
            notasInvalidas = true; // Marcar que hay una nota inválida
            return;
        }

        if (nota < 1 || nota > 100) {
            alert(`Alguna nota tiene un error`);
            notasInvalidas = true; // Marcar que hay una nota inválida
            return;
        }

        // Si todas las validaciones pasan, agregar el registro
        notas.push({
            idNotas: idNotas,
            nota: parseInt(nota) // Asegurar que la nota sea un número entero
        });
    });

    // Verificar si alguna nota fue inválida
    if (notasInvalidas) {
        button.disabled = false;
        button.style.opacity = "1";
        return; // Detener la ejecución si hay notas inválidas
    }

    // Verificar si hay registros válidos antes de proceder
    if (notas.length === 0) {
        alert('No hay notas válidas para actualizar.');
        button.disabled = false;
        button.style.opacity = "1";
        return;
    }

    // Crear el JSON con las notas a enviar
    const data = { notas: notas };

    // Enviar la solicitud POST a la función serverless
    try {
        const response = await fetch('https://15eqv9i01e.execute-api.us-east-1.amazonaws.com/editarNota', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            alert('Notas actualizadas exitosamente.');

            // Limpiar la tabla de notas después de la actualización exitosa
            const tbody = document.querySelector('.attendance-table tbody');
            tbody.innerHTML = ''; // Limpiar el contenido de la tabla
        } else {
            throw new Error('Error al actualizar las notas');
        }
    } catch (error) {
        console.error('Error al guardar las notas:', error);
        alert('Hubo un error al intentar actualizar las notas.');
    } finally {
        // Habilitar el botón nuevamente y restaurar su opacidad
        button.disabled = false;
        button.style.opacity = "1";
    }
}

// Usar addEventListener para que ambas funciones se ejecuten al cargar la página
window.addEventListener('load', function() {
    cargarGrados();
    cargarSecciones();
});

// Añadir un event listener al select de grado para detectar cambios
document.getElementById('grade').addEventListener('change', cargarCursos);

// Asignar la función al botón de búsqueda
document.querySelector('.search-button').addEventListener('click', listarNotas);

// Asignar la función al botón de guardar
document.querySelector('.save-button').addEventListener('click', guardarNotas);

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