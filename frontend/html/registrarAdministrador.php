<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Brisas del Campo - Registrar Usuario</title>
    <link rel="stylesheet" href="../css/registrarAdministrador.css">
</head>
<body>
    <header class="top-bar">
        <h1>Registrar Usuario</h1>
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
                        <li><a href="gestionDocentes.php">Gestión de Docentes</a></li>
                        <li><a href="gestionAdministradores.php">Gestión de Administradores</a></li>
                    </ul>
                </ul>
            </nav>
        </aside>
        <main class="main-content">
            <button class="nav-toggle" id="nav-toggle">&#9776;</button>
            <form class="register-form">
                <div class="input-group">
                    <label for="primerNombre">Primer Nombre:</label>
                    <input type="text" id="primerNombre" name="primerNombre" required>
                </div>
                <div class="input-group">
                    <label for="segundoNombre">Segundo Nombre:</label>
                    <input type="text" id="segundoNombre" name="segundoNombre">
                </div>
                <div class="input-group">
                    <label for="tercerNombre">Tercer Nombre:</label>
                    <input type="text" id="tercerNombre" name="tercerNombre">
                </div>
                <div class="input-group">
                    <label for="primerApellido">Primer Apellido:</label>
                    <input type="text" id="primerApellido" name="primerApellido" required>
                </div>
                <div class="input-group">
                    <label for="segundoApellido">Segundo Apellido:</label>
                    <input type="text" id="segundoApellido" name="segundoApellido">
                </div>
                <!-- Nuevos campos para nombre de usuario y contraseña -->
                <div class="input-group">
                    <label for="nombreUsuario">Nombre de Usuario:</label>
                    <input type="text" id="nombreUsuario" name="nombreUsuario" required>
                </div>
                <div class="input-group">
                    <label for="contrasena">Contraseña:</label>
                    <input type="password" id="contrasena" name="contrasena" required>
                </div>
                <!-- Select para el Rol de Usuario -->
                <div class="input-group">
                    <label for="rolUsuario">Rol de Usuario:</label>
                    <select id="rolUsuario" name="rolUsuario" required>
                        <!-- Aquí se podrían cargar dinámicamente las opciones -->
                    </select>
                </div>
                <button class="register-button" type="submit" id="registerButton">Registrar</button>
            </form>
        </main>
    </div>
    <script src="../js/registrarAdministrador.js"></script>
</body>
</html>
