-- Crear la base de datos
CREATE DATABASE witreeljobsdb;

-- Usar la base de datos (en PostgreSQL, esto se hace con la conexión a la base de datos)

-- Conectar a la base de datos witreeljobsdb
\c witreeljobsdb

CREATE TABLE Paises (
    id_pais SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL
);

CREATE TABLE Areas (
    id_area SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT
);

CREATE TABLE Categoria_Estudios (
    id_categoria_estudio SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT
);

CREATE TABLE Departamentos (
    id_departamento SERIAL PRIMARY KEY,
    fk_id_pais INT REFERENCES Paises(id_pais) ON DELETE CASCADE,
    nombre VARCHAR(100) NOT NULL
);

CREATE TABLE Ubicaciones (
    id_ubicacion SERIAL PRIMARY KEY,
    fk_id_departamento INT REFERENCES Departamentos(id_departamento) ON DELETE CASCADE,
    nombre VARCHAR(100) NOT NULL
);

CREATE TABLE Usuarios (
    id_usuario SERIAL PRIMARY KEY,
    fk_id_ubicacion INT REFERENCES Ubicaciones(id_ubicacion) ON DELETE SET NULL,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    contrasena VARCHAR(255) NOT NULL,
    rol VARCHAR(50),
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Candidatos (
    id_candidato SERIAL PRIMARY KEY,
    fk_id_usuario INT REFERENCES Usuarios(id_usuario) ON DELETE CASCADE,
    fk_id_area INT REFERENCES Areas(id_area) ON DELETE SET NULL,
    apellido VARCHAR(100) NOT NULL,
    genero VARCHAR(10),
    estado_civil VARCHAR(20),
    fecha_nacimiento DATE,
    direccion VARCHAR(255),
    telefono VARCHAR(20),
    linkedin VARCHAR(255)
);

CREATE TABLE Empresas (
    id_empresa SERIAL PRIMARY KEY,
    fk_id_usuario INT REFERENCES Usuarios(id_usuario) ON DELETE CASCADE,
    nombre VARCHAR(100) NOT NULL,
    razon_social VARCHAR(100),
    descripcion TEXT,
    ruc VARCHAR(20) UNIQUE NOT NULL,
    vision TEXT,
    mision TEXT,
    valores TEXT,
    sector VARCHAR(100),
    direccion VARCHAR(255),
    telefono VARCHAR(20),
    email VARCHAR(100) UNIQUE NOT NULL
);

CREATE TABLE Idiomas (
    id_idioma SERIAL PRIMARY KEY,
    fk_id_candidato INT REFERENCES Candidatos(id_candidato) ON DELETE CASCADE,
    nombre VARCHAR(100) NOT NULL,
    nivel VARCHAR(50)
);

CREATE TABLE Experiencias (
    id_experiencia SERIAL PRIMARY KEY,
    fk_id_candidato INT REFERENCES Candidatos(id_candidato) ON DELETE CASCADE,
    titulo VARCHAR(100) NOT NULL,
    descripcion TEXT,
    fecha_inicio DATE,
    fecha_fin DATE,
    estado VARCHAR(50)
);

CREATE TABLE Estudios (
    id_estudio SERIAL PRIMARY KEY,
    fk_id_categoria_estudio INT REFERENCES Categoria_Estudios(id_categoria_estudio) ON DELETE SET NULL,
    fk_id_candidato INT REFERENCES Candidatos(id_candidato) ON DELETE CASCADE,
    titulo VARCHAR(100) NOT NULL,
    descripcion TEXT,
    estado VARCHAR(50)
);

CREATE TABLE Comentarios (
    id_comentario SERIAL PRIMARY KEY,
    fk_id_candidato INT REFERENCES Candidatos(id_candidato) ON DELETE CASCADE,
    fk_id_empresa INT REFERENCES Empresas(id_empresa) ON DELETE CASCADE,
    descripcion TEXT,
    puntaje INT CHECK (puntaje BETWEEN 1 AND 5),
    estado VARCHAR(50)
);

CREATE TABLE Anuncios (
    id_anuncio SERIAL PRIMARY KEY,
    fk_id_empresa INT REFERENCES Empresas(id_empresa) ON DELETE CASCADE,
    fk_id_ubicacion INT REFERENCES Ubicaciones(id_ubicacion) ON DELETE SET NULL,
    fk_id_area INT REFERENCES Areas(id_area) ON DELETE SET NULL,
    fk_id_categoria_estudio INT REFERENCES Categoria_Estudios(id_categoria_estudio) ON DELETE SET NULL,
    titulo VARCHAR(100) NOT NULL,
    descripcion TEXT,
    funciones TEXT,
    requisitos TEXT,
    habilidades TEXT,
    requerimientos TEXT,
    beneficios TEXT,
    direccion VARCHAR(255),
    fecha_entrevista DATE,
    fecha_publicacion DATE,
    tipo_contrato VARCHAR(50),
    modalidad VARCHAR(50),
    jornada_laboral VARCHAR(50),
    horario_trabajo VARCHAR(50),
    cantidad_vacantes INT,
    salario_minimo DECIMAL(10, 2),
    edad_minima INT,
    edad_maxima INT,
    experiencia_anios INT,
    estudio VARCHAR(100),
    discapacitados BOOLEAN
);

CREATE TABLE Postulaciones (
    id_postulacion SERIAL PRIMARY KEY,
    fk_id_candidato INT REFERENCES Candidatos(id_candidato) ON DELETE CASCADE,
    fk_id_empresa INT REFERENCES Empresas(id_empresa) ON DELETE CASCADE,
    fk_id_anuncio INT REFERENCES Anuncios(id_anuncio) ON DELETE CASCADE,
    estado VARCHAR(50),
    fecha_hora TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Notificaciones (
    id_notificacion SERIAL PRIMARY KEY,
    fk_id_empresa INT REFERENCES Empresas(id_empresa) ON DELETE CASCADE,
    fk_id_candidato INT REFERENCES Candidatos(id_candidato) ON DELETE CASCADE,
    titulo VARCHAR(100),
    descripcion TEXT,
    estado_publicacion VARCHAR(50),
    fecha_hora TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

