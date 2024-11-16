-- #Paises
INSERT INTO Paises (nombre) VALUES ('Peru');

-- #Areas
INSERT INTO Areas (nombre, descripcion) VALUES 
('Administración y Gestión', 'Estudios relacionados con la organización y dirección de empresas.'),
('Ingeniería y Tecnología', 'Campo de estudio que abarca el diseño y uso de tecnología en diversas aplicaciones.'),
('Ciencias de la Salud', 'Investigación y práctica en el área de la salud y el bienestar.'),
('Educación', 'Estudios dedicados a la enseñanza y aprendizaje en diversas disciplinas.'),
('Finanzas y Contabilidad', 'Gestión de recursos financieros y contables en organizaciones.'),
('Ventas y Marketing', 'Estrategias para promover y vender productos y servicios.'),
('Construcción y Arquitectura', 'Diseño y construcción de edificaciones y estructuras.'),
('Servicios Legales', 'Estudios sobre el marco legal y la asesoría jurídica.'),
('Artes y Entretenimiento', 'Investigación y práctica en disciplinas artísticas y de entretenimiento.'),
('Transporte y Logística', 'Gestión de la movilidad de bienes y personas.'),
('Agricultura y Medio Ambiente', 'Estudios sobre prácticas agrícolas y sostenibilidad ambiental.'),
('Hostelería y Turismo', 'Gestión de servicios en la industria del turismo y la hospitalidad.'),
('Ciencias Sociales y Humanidades', 'Investigación sobre la sociedad y las experiencias humanas.'),
('Tecnología de la Información', 'Estudios relacionados con el uso de tecnologías digitales.'),
('Producción y Manufactura', 'Proceso de creación y manejo de productos físicos.');

-- #Categoria_Estudios
INSERT INTO Categoria_Estudios (nombre, descripcion) VALUES 
('Educación Secundaria', 'Etapa educativa que sigue a la primaria y prepara para estudios superiores o el mundo laboral. Bachillerato o su equivalente.'),
('Educación Técnica o Tecnológica', 'Estudios técnicos o tecnológicos que suelen durar entre 1 a 3 años, como carreras técnicas o tecnológicas.'),
('Educación Universitaria', 'Grados universitarios como licenciaturas (generalmente 4 años de estudio). Formación más amplia y teórica en una disciplina específica.'),
('Maestrías', 'Grado académico que generalmente dura entre 1 a 2 años, ofreciendo un conocimiento avanzado y habilidades especializadas en una disciplina específica.'),
('Doctorados', 'Programas de estudio que representan el nivel más alto de formación académica, generalmente destinados a la investigación avanzada y que pueden durar varios años.');

-- #Departamentos
INSERT INTO Departamentos (fk_id_pais, nombre) VALUES 
(1, 'Amazonas'),
(1, 'Áncash'),
(1, 'Apurímac'),
(1, 'Arequipa'),
(1, 'Ayacucho'),
(1, 'Cajamarca'),
(1, 'Callao'),
(1, 'Cusco'),
(1, 'Huancavelica'),
(1, 'Huánuco'),
(1, 'Ica'),
(1, 'Junín'),
(1, 'La Libertad'),
(1, 'Lambayeque'),
(1, 'Lima'),
(1, 'Loreto'),
(1, 'Madre de Dios'),
(1, 'Moquegua'),
(1, 'Pasco'),
(1, 'Piura'),
(1, 'Puno'),
(1, 'San Martín'),
(1, 'Tacna'),
(1, 'Tumbes'),
(1, 'Ucayali');

-- #Ubicaciones
-- Amazonas
INSERT INTO Ubicaciones (fk_id_departamento, nombre) VALUES 
(1, 'Bagua'),
(1, 'Bongará'),
(1, 'Chachapoyas'),
(1, 'Condorcanqui'),
(1, 'Luya'),
(1, 'Rodríguez de Mendoza'),
(1, 'Utcubamba');

-- Áncash
INSERT INTO Ubicaciones (fk_id_departamento, nombre) VALUES 
(2, 'Aija'),
(2, 'Antonio Raymondi'),
(2, 'Asunción'),
(2, 'Bolognesi'),
(2, 'Carhuaz'),
(2, 'Carlos Fermín Fitzcarrald'),
(2, 'Casma'),
(2, 'Corongo'),
(2, 'Huaraz'),
(2, 'Huari'),
(2, 'Huarmey'),
(2, 'Huaylas'),
(2, 'Mariscal Luzuriaga'),
(2, 'Ocros'),
(2, 'Pallasca'),
(2, 'Pomabamba'),
(2, 'Recuay'),
(2, 'Santa'),
(2, 'Sihuas'),
(2, 'Yungay');

-- Apurímac
INSERT INTO Ubicaciones (fk_id_departamento, nombre) VALUES
(3, 'Abancay'),
(3, 'Andahuaylas'),
(3, 'Antabamba'),
(3, 'Aymaraes'),
(3, 'Cotabambas'),
(3, 'Grau'),
(3, 'Chincheros');

-- Arequipa
INSERT INTO Ubicaciones (fk_id_departamento, nombre) VALUES
(4, 'Arequipa'),
(4, 'Camaná'),
(4, 'Caravelí'),
(4, 'Castilla'),
(4, 'Caylloma'),
(4, 'Condesuyos'),
(4, 'Islay'),
(4, 'La Unión');

-- Ayacucho
INSERT INTO Ubicaciones (fk_id_departamento, nombre) VALUES
(5, 'Cangallo'),
(5, 'Huamanga'),
(5, 'Huanca Sancos'),
(5, 'Huanta'),
(5, 'La Mar'),
(5, 'Lucanas'),
(5, 'Parinacochas'),
(5, 'Paucar del Sara Sara'),
(5, 'Sucre'),
(5, 'Víctor Fajardo'),
(5, 'Vilcas Huamán');

-- Cajamarca
INSERT INTO Ubicaciones (fk_id_departamento, nombre) VALUES
(6, 'Cajabamba'),
(6, 'Cajamarca'),
(6, 'Celendín'),
(6, 'Chota'),
(6, 'Contumazá'),
(6, 'Cutervo'),
(6, 'Hualgayoc'),
(6, 'Jaén'),
(6, 'San Ignacio'),
(6, 'San Marcos'),
(6, 'San Miguel'),
(6, 'San Pablo'),
(6, 'Santa Cruz');

-- Callao
INSERT INTO Ubicaciones (fk_id_departamento, nombre) VALUES (7, 'Callao');

-- Cusco
INSERT INTO Ubicaciones (fk_id_departamento, nombre) VALUES
(8, 'Acomayo'),
(8, 'Anta'),
(8, 'Calca'),
(8, 'Canas'),
(8, 'Canchis'),
(8, 'Chumbivilcas'),
(8, 'Cusco'),
(8, 'Espinar'),
(8, 'La Convención'),
(8, 'Paruro'),
(8, 'Paucartambo'),
(8, 'Quispicanchi'),
(8, 'Urubamba');

-- Huancavelica
INSERT INTO Ubicaciones (fk_id_departamento, nombre) VALUES
(9, 'Acobamba'),
(9, 'Angaraes'),
(9, 'Castrovirreyna'),
(9, 'Churcampa'),
(9, 'Huancavelica'),
(9, 'Huaytará'),
(9, 'Tayacaja');

-- Huánuco
INSERT INTO Ubicaciones (fk_id_departamento, nombre) VALUES
(10, 'Ambo'),
(10, 'Dos de Mayo'),
(10, 'Huacaybamba'),
(10, 'Huamalíes'),
(10, 'Huánuco'),
(10, 'Lauricocha'),
(10, 'Leoncio Prado'),
(10, 'Marañón'),
(10, 'Pachitea'),
(10, 'Puerto Inca'),
(10, 'Yarowilca');

-- Ica
INSERT INTO Ubicaciones (fk_id_departamento, nombre) VALUES
(11, 'Chincha'),
(11, 'Ica'),
(11, 'Nasca'),
(11, 'Palpa'),
(11, 'Pisco');

-- Junín
INSERT INTO Ubicaciones (fk_id_departamento, nombre) VALUES
(12, 'Chanchamayo'),
(12, 'Chupaca'),
(12, 'Concepción'),
(12, 'Huancayo'),
(12, 'Jauja'),
(12, 'Junín'),
(12, 'Satipo'),
(12, 'Tarma'),
(12, 'Yauli');

-- La Libertad
INSERT INTO Ubicaciones (fk_id_departamento, nombre) VALUES
(13, 'Ascope'),
(13, 'Bolívar'),
(13, 'Chepen'),
(13, 'Gran Chimú'),
(13, 'Julcán'),
(13, 'Otuzco'),
(13, 'Pacasmayo'),
(13, 'Pataz'),
(13, 'Sánchez Carrión'),
(13, 'Santiago de Chuco'),
(13, 'Trujillo'),
(13, 'Santiago de Chuco'),
(13, 'Virú');

-- Lambayeque
INSERT INTO Ubicaciones (fk_id_departamento, nombre) VALUES
(14, 'Chiclayo'),
(14, 'Ferrañefe'),
(14, 'Lambayeque');

-- Lima
INSERT INTO Ubicaciones (fk_id_departamento, nombre) VALUES 
(15, 'Lima'),
(15, 'Barranca'),
(15, 'Cajatambo'),
(15, 'Canta'),
(15, 'Cañete'),
(15, 'Huaral'),
(15, 'Huarochirí'),
(15, 'Huaura'),
(15, 'Oyón'),
(15, 'Yauyos');

-- Loreto
INSERT INTO Ubicaciones (fk_id_departamento, nombre) VALUES
(16, 'Alto Amazonas'),
(16, 'Datem del Marañón'),
(16, 'Loreto'),
(16, 'Mariscal Ramón Castilla'),
(16, 'Maynas'),
(16, 'Putumayo'),
(16, 'Requena'),
(16, 'Ucayali');

-- Madre de Dios
INSERT INTO Ubicaciones (fk_id_departamento, nombre) VALUES
(17, 'Manu'),
(17, 'Tahuamanu'),
(17, 'Tambopata');

-- Moquegua
INSERT INTO Ubicaciones (fk_id_departamento, nombre) VALUES
(18, 'General Sánchez Cerro'),
(18, 'Ilo'),
(18, 'Mariscal Nieto');

-- Pasco
INSERT INTO Ubicaciones (fk_id_departamento, nombre) VALUES
(19, 'Daniel Alcides Carrión'),
(19, 'Oxapampa'),
(19, 'Pasco');

-- Piura
INSERT INTO Ubicaciones (fk_id_departamento, nombre) VALUES
(20, 'Ayabaca'),
(20, 'Huancabamba'),
(20, 'Morropón'),
(20, 'Paita'),
(20, 'Piura'),
(20, 'Sechura'),
(20, 'Sullana'),
(20, 'Talara');

-- Puno
INSERT INTO Ubicaciones (fk_id_departamento, nombre) VALUES
(21, 'Azángaro'),
(21, 'Carabaya'),
(21, 'Chucuito'),
(21, 'El Collao'),
(21, 'Huancané'),
(21, 'Lampa'),
(21, 'Melgar'),
(21, 'Moho'),
(21, 'Puno'),
(21, 'San Antonio de Putina'),
(21, 'San Roman'),
(21, 'Sandia'),
(21, 'Yunguyo');

-- San Martín
INSERT INTO Ubicaciones (fk_id_departamento, nombre) VALUES
(22, 'Bellavista'),
(22, 'El Dorado'),
(22, 'Huallaga'),
(22, 'Lamas'),
(22, 'Mariscal Cáceres'),
(22, 'Moyobamba'),
(22, 'Picota'),
(22, 'Rioja'),
(22, 'San Martín'),
(22, 'Tocache');

-- Tacna
INSERT INTO Ubicaciones (fk_id_departamento, nombre) VALUES
(23, 'Arica'),
(23, 'Candarave'),
(23, 'Tacna'),
(23, 'Tarata');

-- Tumbes
INSERT INTO Ubicaciones (fk_id_departamento, nombre) VALUES
(24, 'Contralmirante Villar'),
(24, 'Tumbes'),
(24, 'Zamurilla');

-- Ucayali
INSERT INTO Ubicaciones (fk_id_departamento, nombre) VALUES
(25, 'Atalaya'),
(25, 'Coronel Portillo'),
(25, 'Padre Abad'),
(25, 'Purús');
