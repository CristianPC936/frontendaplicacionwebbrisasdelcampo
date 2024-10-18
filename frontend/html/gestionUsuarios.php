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
        <div class="user-footer">
            <button id="toggleDropdown" class="user-footer-btn" data-username="<?php echo $_SESSION['nombreUsuario']; ?>">
                <div class="user-img-container">
                    <img src="../resources/userIMG.png" alt="Icono de usuario">
                </div>
                <span class="user-text"><?php echo $_SESSION['nombreUsuario']; ?></span>
            </button>
        </div>
            <img src="../resources/school_icon.png" alt="EORM Brisas del Campo">
            <h2>Brisas del Campo</h2>
            <nav>
                <ul>
                    <li>Generación de reportes</li>
                    <ul>
                        <li><a href="reporteAsistencia.php">Reporte de Asistencia</a></li>
                        <li><a href="reportePromedios.php">Reporte de Promedios</a></li>
                    </ul>
                    <li>Gestión de Usuarios y Estudiantes</li>
                    <ul>
                        <li><a href="gestionEstudiantesAdmin.php">Gestión de Estudiantes</a></li>
                        <li><a href="gestionUsuarios.php">Gestión de Usuarios</a></li>  
                    </ul>
                </ul>
            </nav>
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
</body>
</html>
