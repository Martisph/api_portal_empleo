-- Crear la base de datos
CREATE DATABASE witreeljobsdb;

-- Usar la base de datos (en PostgreSQL, esto se hace con la conexión a la base de datos)

-- Conectar a la base de datos witreeljobsdb
\c witreeljobsdb

-- Crear tabla país
CREATE TABLE pais (
    idpais SERIAL PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL
);

-- Crear tabla departamento
CREATE TABLE departamento (
    iddepartamento SERIAL PRIMARY KEY,
    idpais INT,
    nombre VARCHAR(255) NOT NULL,
    FOREIGN KEY (idpais) REFERENCES pais(idpais)
);

-- Crear tabla ubicacion-distrito
CREATE TABLE ubicacion_distrito (
    idubicacion SERIAL PRIMARY KEY,
    iddepartamento INT,
    nombreubicacion VARCHAR(255) NOT NULL,
    FOREIGN KEY (iddepartamento) REFERENCES departamento(iddepartamento)
);

-- Crear tabla usuario
CREATE TABLE usuario (
    idusuario SERIAL PRIMARY KEY,
    idubicacion INT,
    nombre VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    contraseña VARCHAR(255) NOT NULL,
    tipo_usuario VARCHAR(50),
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (idubicacion) REFERENCES ubicacion_distrito(idubicacion)
);

-- Crear tabla categoria-estudio
CREATE TABLE categoria_estudio (
    idcategoriaestudio SERIAL PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    descripcion TEXT
);

-- Crear tabla areas
CREATE TABLE areas (
    idareas SERIAL PRIMARY KEY,
    nombre_areas VARCHAR(255) NOT NULL,
    descripcion TEXT
);

-- Crear tabla candidatos
CREATE TABLE candidatos (
    idcandidato SERIAL PRIMARY KEY,
    idusuario INT,
    idarea INT,
    apellidos VARCHAR(255) NOT NULL,
    genero CHAR(1),
    estado_civil VARCHAR(50),
    fechanacimiento DATE,
    ciudad VARCHAR(255),
    telefono VARCHAR(20),
    linkedin VARCHAR(255),
    FOREIGN KEY (idusuario) REFERENCES usuario(idusuario),
    FOREIGN KEY (idarea) REFERENCES areas(idareas)
);

-- Crear tabla idiomas
CREATE TABLE idiomas (
    ididioma SERIAL PRIMARY KEY,
    idcandidato INT,
    nombre VARCHAR(255) NOT NULL,
    nivel VARCHAR(50),
    FOREIGN KEY (idcandidato) REFERENCES candidatos(idcandidato)
);

-- Crear tabla experiencia
CREATE TABLE experiencia (
    idexperiencia SERIAL PRIMARY KEY,
    idcandidato INT,
    titulo VARCHAR(255) NOT NULL,
    descripcion TEXT,
    fechainicio DATE,
    fechafin DATE,
    estado VARCHAR(50),
    FOREIGN KEY (idcandidato) REFERENCES candidatos(idcandidato)
);

-- Crear tabla estudio
CREATE TABLE estudio (
    idcategoriaestudio INT,
    idcandidato INT,
    titulo VARCHAR(255) NOT NULL,
    descripcion TEXT,
    estado VARCHAR(50),
    PRIMARY KEY (idcategoriaestudio, idcandidato),
    FOREIGN KEY (idcategoriaestudio) REFERENCES categoria_estudio(idcategoriaestudio),
    FOREIGN KEY (idcandidato) REFERENCES candidatos(idcandidato)
);

-- Crear tabla empresa
CREATE TABLE empresa (
    idusuario INT PRIMARY KEY,
    nombre_empresa VARCHAR(255) NOT NULL,
    razon_social VARCHAR(255) NOT NULL,
    descripcion TEXT,
    ruc VARCHAR(20),
    vision TEXT,
    mision TEXT,
    valores TEXT,
    sector VARCHAR(255),
    ciudad VARCHAR(255),
    telefono VARCHAR(20),
    correo_electronico VARCHAR(255),
    FOREIGN KEY (idusuario) REFERENCES usuario(idusuario)
);

-- Crear tabla notificaciones
CREATE TABLE notificaciones (
    idnotificaciones SERIAL PRIMARY KEY,
    idempresa INT,
    idcandidato INT,
    titulo VARCHAR(255) NOT NULL,
    descripcion TEXT,
    estado_publicacion VARCHAR(50),
    fecha_hora TIMESTAMP NOT NULL,
    FOREIGN KEY (idempresa) REFERENCES empresa(idusuario),
    FOREIGN KEY (idcandidato) REFERENCES candidatos(idcandidato)
);

-- Crear tabla comentario
CREATE TABLE comentario (
    idcomentario SERIAL PRIMARY KEY,
    idcandidato INT,
    idempresa INT,
    descripcion TEXT,
    puntaje INT CHECK (puntaje BETWEEN 1 AND 5),
    estado_comentario VARCHAR(50),
    FOREIGN KEY (idcandidato) REFERENCES candidatos(idcandidato),
    FOREIGN KEY (idempresa) REFERENCES empresa(idusuario)
);

-- Crear tabla anuncio
CREATE TABLE anuncio (
    idanuncio SERIAL PRIMARY KEY,
    idubicacion INT,
    idareas INT,
    idcategoriaestudio INT,
    tipocontrato VARCHAR(50),
    modalidad VARCHAR(50),
    jornada_laboral VARCHAR(50),
    salario DECIMAL(10, 2),
    ciudad VARCHAR(255),
    descripcion_requisitos_anuncio TEXT,
    cantidad_vacantes INT,
    edad_minima INT,    
    fecha_publicacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (idubicacion) REFERENCES ubicacion_distrito(idubicacion),
    FOREIGN KEY (idareas) REFERENCES areas(idareas),
    FOREIGN KEY (idcategoriaestudio) REFERENCES categoria_estudio(idcategoriaestudio)
);

-- Crear tabla postulaciones
CREATE TABLE postulaciones (
    idcandidato INT,
    idempresa INT,
    idanuncio INT,
    estado VARCHAR(50),
    PRIMARY KEY (idcandidato, idempresa, idanuncio),
    FOREIGN KEY (idcandidato) REFERENCES candidatos(idcandidato),
    FOREIGN KEY (idempresa) REFERENCES empresa(idusuario),
    FOREIGN KEY (idanuncio) REFERENCES anuncio(idanuncio)
);
