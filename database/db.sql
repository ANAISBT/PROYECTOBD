-- to create a new database
CREATE DATABASE BloodBank;

-- to use database
use BloodBank;

-- creating a new table
CREATE TABLE donantes (
  id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(50) NOT NULL,
  correo VARCHAR(100) NOT NULL,
  fechaNacimiento DATE NOT NULL,
  DNI int(8) NOT NULL,
  edad INT(3) NOT NULL,
  telefono VARCHAR(15) NOT NULL
);

CREATE TABLE solicitudes (
  id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(30) NOT NULL,
  motivo VARCHAR(50) NOT NULL,
  grupo VARCHAR(15) NOT NULL,
  RH VARCHAR(2) NOT NULL,
  cantidad INT(3) NOT NULL
);

CREATE TABLE extracciones (
  id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  fecha DATE NOT NULL,
  Donante VARCHAR(30) NOT NULL,
  volumen INT(3) NOT NULL,
  grupo VARCHAR(15) NOT NULL,
  RH VARCHAR(2) NOT NULL
);

CREATE TABLE inventario (
  id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  volumen INT(3) NOT NULL,
  grupo VARCHAR(15) NOT NULL,
  RH VARCHAR(2) NOT NULL
);

CREATE TABLE citas(
  id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  Nombre VARCHAR(15) NOT NULL,
  Apellido VARCHAR(15) NOT NULL,
  correo VARCHAR(15) NOT NULL,
  fecha date NOT NULL,
  hora text not null
);

CREATE TABLE usuarios(
id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
usuario VARCHAR(15) NOT NULL,
contraseña VARCHAR(15) NOT NULL
);

INSERT INTO usuarios values ('1','Anais','Bustamante');
INSERT INTO usuarios values ('2','Yosmar','Tejeda');
INSERT INTO usuarios values ('3','Josue','Montes');
INSERT INTO usuarios values ('4','Ahmad','Velásquez');
INSERT INTO usuarios values ('5','Sebastian','Cespedez');

CREATE VIEW sangre_disponibles AS
SELECT grupo, RH, SUM(volumen) AS volumen_total FROM extracciones GROUP BY grupo, RH;

DELIMITER //
CREATE PROCEDURE calcular_edad(IN fecha_nacimiento DATE, OUT edad INT)
BEGIN
    SET edad = TIMESTAMPDIFF(YEAR, fecha_nacimiento, CURDATE());
END //
DELIMITER ;

DELIMITER //
CREATE TRIGGER actualizar_edad_donante
BEFORE INSERT ON donantes
FOR EACH ROW
BEGIN
    CALL calcular_edad(NEW.fechaNacimiento, @edad);
    SET NEW.edad = @edad;
END //
DELIMITER ;


DELIMITER $$
CREATE or replace PROCEDURE actualizar_inventario()
BEGIN
    DECLARE done INT DEFAULT FALSE;
    DECLARE grupo_sanguineo VARCHAR(15);
    DECLARE RH_new VARCHAR(2);
    DECLARE volumen_total INT(3);
    DECLARE inventario_count INT DEFAULT 0;
    
    -- Cursor para recorrer las extracciones
    DECLARE cur_extracciones CURSOR FOR SELECT grupo, RH, SUM(volumen) AS total_volumen FROM extracciones GROUP BY grupo, RH;
    DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = TRUE;
    
    -- Abrir el cursor
    OPEN cur_extracciones;
    
    -- Recorrer las extracciones
    WHILE NOT done DO
        FETCH cur_extracciones INTO grupo_sanguineo, RH_new, volumen_total;
        
        -- Verificar si ya existe una fila con el mismo grupo y RH en la tabla "inventario"
        SELECT COUNT(*) INTO inventario_count FROM inventario WHERE grupo = grupo_sanguineo AND RH = RH_new;
        
        IF inventario_count = 0 THEN
            -- Insertar una nueva fila en la tabla "inventario"
            INSERT INTO inventario (grupo, RH, volumen) VALUES (grupo_sanguineo, RH_new, volumen_total);
        ELSE
            -- Actualizar la fila existente en la tabla "inventario"
            UPDATE inventario SET volumen = volumen + volumen_total WHERE grupo = grupo_sanguineo AND RH = RH_new;
        END IF;

    END WHILE;
    
    -- Cerrar el cursor
    CLOSE cur_extracciones;
END$$
DELIMITER ;





DELIMITER $$
CREATE or replace TRIGGER actualizarInventario AFTER INSERT ON extracciones
FOR EACH ROW
BEGIN
    CALL actualizar_inventario();
END$$
DELIMITER ;



CREATE INDEX idx_grupoSolicitud ON solicitudes(grupo);

-- to show all tables
show tables;

-- to describe table
describe donantes;