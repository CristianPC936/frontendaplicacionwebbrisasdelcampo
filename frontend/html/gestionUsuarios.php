<?php
require_once '../../backend/verificar_sesion.php'; // Verificar la sesión
require_once '../../backend/verificar_acceso.php'; // Verificar el rol

// Verificar que el usuario sea administrador
verificar_acceso('Administrador');
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Brisas del Campo - Gestión de Usuarios</title>
    <link rel="stylesheet" href="../css/gestionUsuarios.css">
</head>
<body>
    <header class="top-bar">
        <h1>Gestión de Usuarios</h1>
    </header>
    <div class="container">
        <aside class="sidebar">
            <img src="../resources/school_icon.png" alt="EORM Brisas del Campo">
            <h2>Brisas del Campo</h2>
            <nav>
                <ul>
                    <li>Gestión de Asistencia</li>
                    <ul>
                        <li><a href="reporteAsistencia.php">Generar reportes</a></li>
                    </ul>
                    <li>Gestión de Usuarios y Estudiantes</li>
                    <ul>
                        <li><a href="gestionEstudiantesAdmin.php">Gestión de Estudiantes</a></li>
                        <li><a href="gestionUsuarios.php">Gestión de Usuarios</a></li>  
                    </ul>
                </ul>
            </nav>
            <!-- Botón para el cierre de sesión -->
            <div class="user-footer">
                <button id="toggleDropdown" class="user-footer-btn"><?php echo $_SESSION['nombreUsuario']; ?></button>
            </div>
        </aside>

        <main class="main-content">
            <!-- Botón de navegación -->
            <button class="nav-toggle" id="nav-toggle">
                &#9776;
            </button>

            <div class="admin-management">
                <div class="admin-option">
                    <a href="registrarUsuario.php"><img src="../resources/userC.png" alt="Registrar Administrador"></a>
                </div>
                <div class="admin-option">
                    <a href="buscarEditarEliminarUsuario.php"><img src="../resources/userRUD.png" alt="Buscar/Editar/Eliminar Usuario"></a>
                </div>
                <div class="admin-option">
                    <a href="listarYAsignarDocente.php"><img src="../resources/teacherRU.png" alt="listar y asignar docente"></a>
                </div>
            </div>
        </main>
    </div>
    <script src="../js/gestionUsuarios.js"></script> <!-- Ruta actualizada -->
    <script>
        const userFooterBtn = document.getElementById('toggleDropdown');
        
        // Función para hacer la transición suave
        function transitionButton(newText) {
            userFooterBtn.style.opacity = '0'; // Desaparecer el botón actual
            setTimeout(() => {
                userFooterBtn.textContent = newText; // Cambiar el texto
                userFooterBtn.style.opacity = '1'; // Mostrar el nuevo texto
            }, 300); // Tiempo de la transición de 0.3 segundos
        }

        // Mostrar "Cerrar sesión" en lugar del nombre de usuario
        userFooterBtn.addEventListener('click', function (event) {
            event.stopPropagation(); // Detener la propagación del evento para no activar el cierre inmediato
            if (userFooterBtn.textContent === 'Cerrar sesión') {
                window.location.href = '../../backend/logout.php'; // Redirigir al logout
            } else {
                transitionButton('Cerrar sesión');
            }
        });

        // Si el usuario hace clic en cualquier parte de la página, restaurar el nombre del usuario
        document.addEventListener('click', function () {
            if (userFooterBtn.textContent === 'Cerrar sesión') {
                transitionButton('<?php echo $_SESSION['nombreUsuario']; ?>');
            }
        });

        // Detener la propagación del evento cuando el usuario haga clic en el botón de usuario
        userFooterBtn.addEventListener('click', function (event) {
            event.stopPropagation();
        });
    </script>
</body>
</html>
