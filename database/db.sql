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

CREATE TABLE extracciones (
  id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  fecha DATE NOT NULL,
  Donante VARCHAR(30) NOT NULL,
  volumen INT(3) NOT NULL,
  grupo VARCHAR(15) NOT NULL,
  RH VARCHAR(2) NOT NULL
);

-- to show all tables
show tables;

-- to describe table
describe donantes;