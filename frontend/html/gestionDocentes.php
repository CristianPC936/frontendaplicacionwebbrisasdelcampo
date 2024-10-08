<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Brisas del Campo - Gestión de Docentes</title>
    <link rel="stylesheet" href="../css/gestionDocentes.css">
</head>
<body>
    <header class="top-bar">
        <h1>Gestión de Docentes</h1>
    </header>
    <div class="container">
        <aside class="sidebar">
            <img src="../resources/school_icon.png" alt="EORM Brisas del Campo">
            <h2>Brisas del Campo</h2>
            <nav>
                <ul>
                    <li>Gestión de Asistencia</li>
                    <ul>
                        <li><a href="registrarAsistencia.php">Registrar</a></li>
                        <li><a href="listadoYEdicionAsistencia.php">Listar o Editar</a></li>
                        <li><a href="reporteAsistencia.php">Generar reportes</a></li>
                    </ul>
                    <li>Gestión de Notas</li>
                    <ul>
                        <li><a href="registrarNotas.php">Registrar</a></li>
                        <li><a href="listadoYEdicionNotas.php">Listar o Editar</a></li>
                    </ul>
                    <li>Gestión de Usuarios y Estudiantes</li>
                    <ul>
                        <li><a href="gestionEstudiantes.php">Gestión de Estudiantes</a></li>
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

            <div class="teacher-management"> <!-- Cambiado de "student-management" a "teacher-management" -->
                <div class="teacher-option"> <!-- Cambiado de "student-option" a "teacher-option" -->
                    <a href="registrarDocente.php"><img src="../resources/userC.png" alt="Registrar Docente"></a>
                </div>
                <div class="teacher-option"> <!-- Cambiado de "student-option" a "teacher-option" -->
                    <a href="buscarEditarEliminarDocente.php"><img src="../resources/userRUD.png" alt="Buscar/Editar/Eliminar Docente"></a>
                </div>
            </div>
        </main>
    </div>
    <script src="../js/gestionDocentes.js"></script> <!-- Ruta actualizada -->
</body>
</html>
