USE biblioteca;
DROP DATABASE biblioteca;
CREATE DATABASE IF NOT EXISTS biblioteca
    DEFAULT CHARACTER SET utf8mb4
    DEFAULT COLLATE utf8mb4_spanish_ci;
USE biblioteca;

-- Recursos genéricos
CREATE TABLE tipo_recurso (
    id INT PRIMARY KEY AUTO_INCREMENT,
    descripcion VARCHAR(50) NOT NULL
);

CREATE TABLE recursos (
    id INT PRIMARY KEY AUTO_INCREMENT,
    tipo INT NOT NULL,
    titulo VARCHAR(150) NOT NULL,
    num_ejemplares INT NOT NULL,
    UNIQUE (tipo, titulo),
    FOREIGN KEY (tipo) REFERENCES tipo_recurso(id)
);

CREATE TABLE libros (
    id INT PRIMARY KEY,
    autor VARCHAR(100) NOT NULL,
    FOREIGN KEY (id) REFERENCES recursos(id)
);

CREATE TABLE revistas (
    id INT PRIMARY KEY,
    fecha_publicacion DATE NOT NULL,
    FOREIGN KEY (id) REFERENCES recursos(id)
);

CREATE TABLE peliculas (
    id INT PRIMARY KEY,
    director VARCHAR(100) NOT NULL,
    genero VARCHAR(50) NOT NULL,
    FOREIGN KEY (id) REFERENCES recursos(id)
);

-- Tabla padre para herencia de socios y admins
CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    dni VARCHAR(9) UNIQUE,
    nombre VARCHAR(100) NOT NULL,
    tipo_usuario ENUM('socio', 'administrador') NOT NULL
);

CREATE TABLE socios (
    id INT PRIMARY KEY,
    FOREIGN KEY (id) REFERENCES usuarios(id)
);

-- Tabla de cargos
CREATE TABLE cargos (
    id INT PRIMARY KEY AUTO_INCREMENT,
    descripcion VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE administradores (
    id INT PRIMARY KEY,
    id_cargo INT NOT NULL,
    FOREIGN KEY (id) REFERENCES usuarios(id),
    FOREIGN KEY (id_cargo) REFERENCES cargos(id)
);

CREATE TABLE prestamos (
    id INT PRIMARY KEY AUTO_INCREMENT,
    id_socio INT NOT NULL,
    id_admin INT NOT NULL,
    id_recurso INT NOT NULL,
    fecha_prestamo DATE NOT NULL DEFAULT (CURDATE()),
    fecha_devolucion DATE DEFAULT NULL,
    CONSTRAINT socios_prestamos FOREIGN KEY (id_socio) REFERENCES socios(id),
    CONSTRAINT admins_prestamos FOREIGN KEY (id_admin) REFERENCES administradores(id),
    CONSTRAINT recursos_prestamos FOREIGN KEY (id_recurso) REFERENCES recursos(id)
);

-- ----------------------------------------------------------------------------
-- Inserts de tipos de materiales y cargos
INSERT INTO tipo_recurso (id, descripcion) VALUES
    (1, 'libro'),
    (2, 'pelicula'),
    (3, 'revista'); 

INSERT INTO cargos (id, descripcion) VALUES
    (1, 'Administrador'),
    (2, 'Ayudante');

-- ----------------------------------------------------------------------------


-- Vistas para ver prestamos de cada socio
CREATE VIEW vw_libros_prestados AS
    SELECT s.id AS id_socio, u.nombre AS nombre_socio, u.dni AS dni_socio, r.titulo AS libro, p.fecha_prestamo
    FROM prestamos p
    JOIN recursos r ON p.id_recurso = r.id
    JOIN socios s ON p.id_socio = s.id
    JOIN usuarios u ON p.id_socio = u.id
    WHERE p.fecha_devolucion IS NULL AND r.tipo = 1;

CREATE VIEW vw_peliculas_prestados AS
    SELECT s.id AS id_socio, u.nombre AS nombre_socio, u.dni AS dni_socio, r.titulo AS pelicula, p.fecha_prestamo
    FROM prestamos p
    JOIN recursos r ON p.id_recurso = r.id
    JOIN socios s ON p.id_socio = s.id
    JOIN usuarios u ON p.id_socio = u.id
    WHERE p.fecha_devolucion IS NULL AND r.tipo = 2;

CREATE VIEW vw_revistas_prestados AS
    SELECT s.id AS id_socio, u.nombre AS nombre_socio, u.dni AS dni_socio, r.titulo AS revista, p.fecha_prestamo
    FROM prestamos p
    JOIN recursos r ON p.id_recurso = r.id
    JOIN socios s ON p.id_socio = s.id
    JOIN usuarios u ON p.id_socio = u.id
    WHERE p.fecha_devolucion IS NULL AND r.tipo = 3;

-- Vistas de ususarios
CREATE VIEW vw_socios AS
    SELECT s.id, u.dni, u.nombre
    FROM usuarios u
    JOIN socios s ON u.id = s.id;

CREATE VIEW vw_admins AS
    SELECT a.id, u.dni, u.nombre, c.id AS id_cargo, c.descripcion AS cargo
    FROM usuarios u
    JOIN administradores a ON u.id = a.id
    JOIN cargos c ON a.id_cargo = c.id;

-- vistas de recursos
CREATE VIEW vw_libros AS
    SELECT r.id, r.titulo, r.num_ejemplares, l.autor
    FROM recursos r
    JOIN libros l ON r.id = l.id
    WHERE r.tipo = 1;

CREATE VIEW vw_peliculas AS
    SELECT r.id, r.titulo, r.num_ejemplares, p.director, p.genero
    FROM recursos r
    JOIN peliculas p ON r.id = p.id
    WHERE r.tipo = 2;

CREATE VIEW vw_revistas AS
    SELECT r.id, r.titulo, r.num_ejemplares, rev.fecha_publicacion
    FROM recursos r
    JOIN revistas rev ON r.id = rev.id
    WHERE r.tipo = 3;

CREATE VIEW vw_recursos AS
    SELECT r.id, tr.id AS id_tipo_recurso, tr.descripcion AS tipo_recurso, r.titulo, r.num_ejemplares
    FROM recursos r
    JOIN tipo_recurso tr ON r.tipo = tr.id;


-- ----------------------------------------------------------------------------

DELIMITER $$

-- Trigger para evitar que un recurso tenga menos de 0 ejemplares
CREATE TRIGGER tr_no_ejemplares_negativos
        BEFORE UPDATE ON recursos
        FOR EACH ROW
    BEGIN
        IF NEW.num_ejemplares < 0 THEN
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Fuera de stock';
        END IF;
    END$$

-- Trigger para decrementar ejemplares al insertar un préstamo
CREATE TRIGGER tr_decrementar_ejemplares_prestamo
        AFTER INSERT ON prestamos
        FOR EACH ROW
    BEGIN
        UPDATE recursos
        SET num_ejemplares = num_ejemplares - 1
        WHERE id = NEW.id_recurso;
    END$$


-- Trigger para incrementar ejemplares al devolver un préstamo
CREATE TRIGGER tr_incrementar_ejemplares_devolucion
        AFTER UPDATE ON prestamos
        FOR EACH ROW
    BEGIN
        IF OLD.fecha_devolucion IS NULL AND NEW.fecha_devolucion IS NOT NULL THEN
            UPDATE recursos
            SET num_ejemplares = num_ejemplares + 1
            WHERE id = NEW.id_recurso;
        END IF;
    END$$


-- Trigger para verificar que el usuario sea de tipo 'administrador' antes de insertarlo en la tabla de admins
CREATE TRIGGER tr_validar_tipo_admin
        BEFORE INSERT ON administradores
        FOR EACH ROW
    BEGIN
        DECLARE v_tipo_usuario ENUM('socio', 'administrador');
        
        SELECT tipo_usuario INTO v_tipo_usuario
        FROM usuarios
        WHERE id = NEW.id;
        
        IF v_tipo_usuario != 'administrador' THEN
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'El usuario debe ser de tipo administrador';
        END IF;
    END$$

-- Trigger para verificar que el usuario sea de tipo 'socio' antes de insertarlo en la tabla de socios
CREATE TRIGGER tr_validar_tipo_socio
        BEFORE INSERT ON socios
        FOR EACH ROW
    BEGIN
        DECLARE v_tipo_usuario ENUM('socio', 'administrador');
        
        SELECT tipo_usuario INTO v_tipo_usuario
        FROM usuarios
        WHERE id = NEW.id;
        
        IF v_tipo_usuario != 'socio' THEN
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'El usuario debe ser de tipo socio';
        END IF;
    END$$
DELIMITER ;

-- Datos de prueba
-- ----------------------------------------------------------------------------
-- Usuarios
INSERT INTO usuarios (dni, nombre, tipo_usuario) VALUES
('12345678A', 'Juan Pérez', 'socio'),
('23456789B', 'María López', 'socio'),
('34567890C', 'Pedro García', 'administrador'),
('45678901D', 'Laura Fernández', 'administrador');

-- Socios
INSERT INTO socios (id) VALUES
(1),
(2);

-- Administradores
INSERT INTO administradores (id, id_cargo) VALUES
(3, 1),
(4, 2);

-- ----------------------------------------------------------------------------
-- Recursos: libros, películas y revistas
INSERT INTO recursos (tipo, titulo, num_ejemplares) VALUES
(1, 'Cien Años de Soledad', 5),
(1, 'El Quijote', 3),
(2, 'Matrix', 4),
(2, 'Inception', 2),
(3, 'National Geographic Octubre 2025', 10),
(3, 'Time Septiembre 2025', 7);

-- Libros
INSERT INTO libros (id, autor) VALUES
(1, 'Gabriel García Márquez'),
(2, 'Miguel de Cervantes');

-- Películas
INSERT INTO peliculas (id, director, genero) VALUES
(3, 'The Wachowskis', 'Ciencia Ficción'),
(4, 'Christopher Nolan', 'Suspense');

-- Revistas
INSERT INTO revistas (id, fecha_publicacion) VALUES
(5, '2025-10-01'),
(6, '2025-09-15');

-- ----------------------------------------------------------------------------
-- Préstamos
INSERT INTO prestamos (id_socio, id_admin, id_recurso, fecha_prestamo) VALUES
(1, 3, 1, '2025-10-20'), -- Juan Pérez pide "Cien Años de Soledad"
(1, 3, 3, '2025-10-21'), -- Juan Pérez pide "Matrix"
(2, 4, 2, '2025-10-22'); -- María López pide "El Quijote"

