CREATE TABLE departamento (
    id_departamento BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    departamento VARCHAR(120) NOT NULL,
    ubigeo VARCHAR(10) UNIQUE,

    created_at TIMESTAMP(6) WITHOUT TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP(6) WITHOUT TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE provincia (
    id_provincia BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    id_departamento BIGINT NOT NULL,
    provincia VARCHAR(120) NOT NULL,
    ubigeo VARCHAR(10) UNIQUE,

    created_at TIMESTAMP(6) WITHOUT TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP(6) WITHOUT TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_provincia_departamento
        FOREIGN KEY (id_departamento)
        REFERENCES departamento(id_departamento)
        ON DELETE RESTRICT
);

CREATE TABLE distrito (
    id_distrito BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    id_provincia BIGINT NOT NULL,
    distrito VARCHAR(120) NOT NULL,
    ubigeo VARCHAR(10) UNIQUE,

    created_at TIMESTAMP(6) WITHOUT TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP(6) WITHOUT TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_distrito_provincia
        FOREIGN KEY (id_provincia)
        REFERENCES provincia(id_provincia)
        ON DELETE RESTRICT
);

CREATE TABLE empresa (
    id_empresa BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,

    id_distrito BIGINT NOT NULL,

    ruc VARCHAR(20) NOT NULL UNIQUE,
    razon_social VARCHAR(255) NOT NULL,
    nombre_comercial VARCHAR(255),

    telefono VARCHAR(20),
    correo_corporativo VARCHAR(150),
    direccion VARCHAR(255),

    fecha_inicio_actividades DATE,
    sitio_web VARCHAR(255),
    condicion_ruc VARCHAR(50),

    created_at TIMESTAMP(6) WITHOUT TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP(6) WITHOUT TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_empresa_distrito
        FOREIGN KEY (id_distrito)
        REFERENCES distrito(id_distrito)
        ON DELETE RESTRICT
);

CREATE TABLE sucursal (
    id_sucursal BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    id_empresa BIGINT NOT NULL,
    id_distrito BIGINT NOT NULL,

    nombre_sucursal VARCHAR(150) NOT NULL,
    direccion VARCHAR(255),

    created_at TIMESTAMP(6) WITHOUT TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP(6) WITHOUT TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_sucursal_empresa
        FOREIGN KEY (id_empresa)
        REFERENCES empresa(id_empresa)
        ON DELETE CASCADE,

    CONSTRAINT fk_sucursal_distrito
        FOREIGN KEY (id_distrito)
        REFERENCES distrito(id_distrito)
        ON DELETE RESTRICT
);

CREATE TABLE persona (
    id_persona BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    id_empresa BIGINT NOT NULL,

    nombres_completos VARCHAR(255) NOT NULL,
    cargo VARCHAR(120),

    correo_personal VARCHAR(150),
    celular_personal VARCHAR(20),

    created_at TIMESTAMP(6) WITHOUT TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP(6) WITHOUT TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_persona_empresa
        FOREIGN KEY (id_empresa)
        REFERENCES empresa(id_empresa)
        ON DELETE CASCADE
);

CREATE TABLE empresa_tipo (
    id_empresa BIGINT NOT NULL,
    id_tipo_empresa BIGINT NOT NULL,

    created_at TIMESTAMP(6) WITHOUT TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP(6) WITHOUT TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY (id_empresa, id_tipo_empresa),

    CONSTRAINT fk_empresa_tipo_empresa
        FOREIGN KEY (id_empresa)
        REFERENCES empresa(id_empresa)
        ON DELETE CASCADE,

    CONSTRAINT fk_empresa_tipo_tipo
        FOREIGN KEY (id_tipo_empresa)
        REFERENCES tipo_empresa(id_tipo_empresa)
        ON DELETE RESTRICT
);

CREATE TABLE tipo_empresa (
    id_tipo_empresa BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL UNIQUE,

    created_at TIMESTAMP(6) WITHOUT TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP(6) WITHOUT TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

select * from tipo_empresa;
INSERT INTO tipo_empresa (nombre) VALUES
('CLIENTE'),
('PROVEEDOR'),
('TRANSPORTISTA'),
('SOCIO'),
('DISTRIBUIDOR');

CREATE TABLE tipo_usuario (
    id_tipo_usuario BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    tipo VARCHAR(50) NOT NULL UNIQUE,

    created_at TIMESTAMP(6) WITHOUT TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP(6) WITHOUT TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE usuario (
    id_usuario BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    id_tipo_usuario BIGINT NOT NULL,

    nombre_usuario VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    contrasenia VARCHAR(255) NOT NULL,

    fecha_registro TIMESTAMP(6) WITHOUT TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    estado BOOLEAN NOT NULL DEFAULT TRUE,

    created_at TIMESTAMP(6) WITHOUT TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP(6) WITHOUT TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_usuario_tipo
        FOREIGN KEY (id_tipo_usuario)
        REFERENCES tipo_usuario(id_tipo_usuario)
        ON DELETE RESTRICT
);

select * from empresa_tipo;
insert into tipo_usuario (tipo) values('Trabajador');

insert into empresa_tipo (tipo) values('Trabajador');

CREATE INDEX idx_empresa_distrito ON empresa(id_distrito);
CREATE INDEX idx_sucursal_empresa ON sucursal(id_empresa);
CREATE INDEX idx_persona_empresa ON persona(id_empresa);
CREATE INDEX idx_empresa_tipo_empresa ON empresa_tipo(id_empresa);
CREATE INDEX idx_usuario_tipo ON usuario(id_tipo_usuario);

INSERT INTO departamento (departamento, ubigeo) VALUES
('AMAZONAS','01'),
('ÁNCASH','02'),
('APURÍMAC','03'),
('AREQUIPA','04'),
('AYACUCHO','05'),
('CAJAMARCA','06'),
('CALLAO','07'),
('CUSCO','08'),
('HUANCAVELICA','09'),
('HUÁNUCO','10'),
('ICA','11'),
('JUNÍN','12'),
('LA LIBERTAD','13'),
('LAMBAYEQUE','14'),
('LIMA','15'),
('LORETO','16'),
('MADRE DE DIOS','17'),
('MOQUEGUA','18'),
('PASCO','19'),
('PIURA','20'),
('PUNO','21'),
('SAN MARTÍN','22'),
('TACNA','23'),
('TUMBES','24'),
('UCAYALI','25');

INSERT INTO provincia (id_departamento, provincia, ubigeo)
SELECT d.id_departamento, 'LIMA', '1501' FROM departamento d WHERE d.ubigeo='15';

INSERT INTO provincia (id_departamento, provincia, ubigeo)
SELECT d.id_departamento, 'BARRANCA', '1502' FROM departamento d WHERE d.ubigeo='15';

INSERT INTO provincia (id_departamento, provincia, ubigeo)
SELECT d.id_departamento, 'CAJATAMBO', '1503' FROM departamento d WHERE d.ubigeo='15';

INSERT INTO provincia (id_departamento, provincia, ubigeo)
SELECT d.id_departamento, 'CANTA', '1504' FROM departamento d WHERE d.ubigeo='15';

INSERT INTO provincia (id_departamento, provincia, ubigeo)
SELECT d.id_departamento, 'CAÑETE', '1505' FROM departamento d WHERE d.ubigeo='15';

INSERT INTO provincia (id_departamento, provincia, ubigeo)
SELECT d.id_departamento, 'HUARAL', '1506' FROM departamento d WHERE d.ubigeo='15';

INSERT INTO provincia (id_departamento, provincia, ubigeo)
SELECT d.id_departamento, 'HUAROCHIRÍ', '1507' FROM departamento d WHERE d.ubigeo='15';

INSERT INTO provincia (id_departamento, provincia, ubigeo)
SELECT d.id_departamento, 'HUAURA', '1508' FROM departamento d WHERE d.ubigeo='15';

INSERT INTO provincia (id_departamento, provincia, ubigeo)
SELECT d.id_departamento, 'OYÓN', '1509' FROM departamento d WHERE d.ubigeo='15';

INSERT INTO provincia (id_departamento, provincia, ubigeo)
SELECT d.id_departamento, 'YAUYOS', '1510' FROM departamento d WHERE d.ubigeo='15';

//
INSERT INTO distrito (id_provincia, distrito, ubigeo)
SELECT p.id_provincia, 'CERCADO DE LIMA', '150101'
FROM provincia p WHERE p.ubigeo='1501';

INSERT INTO distrito (id_provincia, distrito, ubigeo)
SELECT p.id_provincia, 'ANCÓN', '150102'
FROM provincia p WHERE p.ubigeo='1501';

INSERT INTO distrito (id_provincia, distrito, ubigeo)
SELECT p.id_provincia, 'ATE', '150103'
FROM provincia p WHERE p.ubigeo='1501';

INSERT INTO distrito (id_provincia, distrito, ubigeo)
SELECT p.id_provincia, 'BARRANCO', '150104'
FROM provincia p WHERE p.ubigeo='1501';

INSERT INTO distrito (id_provincia, distrito, ubigeo)
SELECT p.id_provincia, 'BREÑA', '150105'
FROM provincia p WHERE p.ubigeo='1501';

INSERT INTO distrito (id_provincia, distrito, ubigeo)
SELECT p.id_provincia, 'CARABAYLLO', '150106'
FROM provincia p WHERE p.ubigeo='1501';

INSERT INTO distrito (id_provincia, distrito, ubigeo)
SELECT p.id_provincia, 'CHACLACAYO', '150107'
FROM provincia p WHERE p.ubigeo='1501';

INSERT INTO distrito (id_provincia, distrito, ubigeo)
SELECT p.id_provincia, 'CHORRILLOS', '150108'
FROM provincia p WHERE p.ubigeo='1501';

INSERT INTO distrito (id_provincia, distrito, ubigeo)
SELECT p.id_provincia, 'CIENEGUILLA', '150109'
FROM provincia p WHERE p.ubigeo='1501';

INSERT INTO distrito (id_provincia, distrito, ubigeo)
SELECT p.id_provincia, 'COMAS', '150110'
FROM provincia p WHERE p.ubigeo='1501';

INSERT INTO distrito (id_provincia, distrito, ubigeo)
SELECT p.id_provincia, 'EL AGUSTINO', '150111'
FROM provincia p WHERE p.ubigeo='1501';

INSERT INTO distrito (id_provincia, distrito, ubigeo)
SELECT p.id_provincia, 'INDEPENDENCIA', '150112'
FROM provincia p WHERE p.ubigeo='1501';

INSERT INTO distrito (id_provincia, distrito, ubigeo)
SELECT p.id_provincia, 'JESÚS MARÍA', '150113'
FROM provincia p WHERE p.ubigeo='1501';

INSERT INTO distrito (id_provincia, distrito, ubigeo)
SELECT p.id_provincia, 'LA MOLINA', '150114'
FROM provincia p WHERE p.ubigeo='1501';

INSERT INTO distrito (id_provincia, distrito, ubigeo)
SELECT p.id_provincia, 'LA VICTORIA', '150115'
FROM provincia p WHERE p.ubigeo='1501';

INSERT INTO distrito (id_provincia, distrito, ubigeo)
SELECT p.id_provincia, 'LINCE', '150116'
FROM provincia p WHERE p.ubigeo='1501';

INSERT INTO distrito (id_provincia, distrito, ubigeo)
SELECT p.id_provincia, 'LOS OLIVOS', '150117'
FROM provincia p WHERE p.ubigeo='1501';

INSERT INTO distrito (id_provincia, distrito, ubigeo)
SELECT p.id_provincia, 'LURIGANCHO', '150118'
FROM provincia p WHERE p.ubigeo='1501';

INSERT INTO distrito (id_provincia, distrito, ubigeo)
SELECT p.id_provincia, 'LURÍN', '150119'
FROM provincia p WHERE p.ubigeo='1501';

INSERT INTO distrito (id_provincia, distrito, ubigeo)
SELECT p.id_provincia, 'MAGDALENA DEL MAR', '150120'
FROM provincia p WHERE p.ubigeo='1501';

INSERT INTO distrito (id_provincia, distrito, ubigeo)
SELECT p.id_provincia, 'MIRAFLORES', '150121'
FROM provincia p WHERE p.ubigeo='1501';

INSERT INTO distrito (id_provincia, distrito, ubigeo)
SELECT p.id_provincia, 'PACHACÁMAC', '150122'
FROM provincia p WHERE p.ubigeo='1501';

INSERT INTO distrito (id_provincia, distrito, ubigeo)
SELECT p.id_provincia, 'PUCUSANA', '150123'
FROM provincia p WHERE p.ubigeo='1501';

INSERT INTO distrito (id_provincia, distrito, ubigeo)
SELECT p.id_provincia, 'PUEBLO LIBRE', '150124'
FROM provincia p WHERE p.ubigeo='1501';

INSERT INTO distrito (id_provincia, distrito, ubigeo)
SELECT p.id_provincia, 'PUENTE PIEDRA', '150125'
FROM provincia p WHERE p.ubigeo='1501';

INSERT INTO distrito (id_provincia, distrito, ubigeo)
SELECT p.id_provincia, 'PUNTA HERMOSA', '150126'
FROM provincia p WHERE p.ubigeo='1501';

INSERT INTO distrito (id_provincia, distrito, ubigeo)
SELECT p.id_provincia, 'PUNTA NEGRA', '150127'
FROM provincia p WHERE p.ubigeo='1501';

INSERT INTO distrito (id_provincia, distrito, ubigeo)
SELECT p.id_provincia, 'RÍMAC', '150128'
FROM provincia p WHERE p.ubigeo='1501';

INSERT INTO distrito (id_provincia, distrito, ubigeo)
SELECT p.id_provincia, 'SAN BARTOLO', '150129'
FROM provincia p WHERE p.ubigeo='1501';

INSERT INTO distrito (id_provincia, distrito, ubigeo)
SELECT p.id_provincia, 'SAN BORJA', '150130'
FROM provincia p WHERE p.ubigeo='1501';

INSERT INTO distrito (id_provincia, distrito, ubigeo)
SELECT p.id_provincia, 'SAN ISIDRO', '150131'
FROM provincia p WHERE p.ubigeo='1501';

INSERT INTO distrito (id_provincia, distrito, ubigeo)
SELECT p.id_provincia, 'SAN JUAN DE LURIGANCHO', '150132'
FROM provincia p WHERE p.ubigeo='1501';

INSERT INTO distrito (id_provincia, distrito, ubigeo)
SELECT p.id_provincia, 'SAN JUAN DE MIRAFLORES', '150133'
FROM provincia p WHERE p.ubigeo='1501';

INSERT INTO distrito (id_provincia, distrito, ubigeo)
SELECT p.id_provincia, 'SAN LUIS', '150134'
FROM provincia p WHERE p.ubigeo='1501';

INSERT INTO distrito (id_provincia, distrito, ubigeo)
SELECT p.id_provincia, 'SAN MARTÍN DE PORRES', '150135'
FROM provincia p WHERE p.ubigeo='1501';

INSERT INTO distrito (id_provincia, distrito, ubigeo)
SELECT p.id_provincia, 'SAN MIGUEL', '150136'
FROM provincia p WHERE p.ubigeo='1501';

INSERT INTO distrito (id_provincia, distrito, ubigeo)
SELECT p.id_provincia, 'SANTA ANITA', '150137'
FROM provincia p WHERE p.ubigeo='1501';

INSERT INTO distrito (id_provincia, distrito, ubigeo)
SELECT p.id_provincia, 'SANTA MARÍA DEL MAR', '150138'
FROM provincia p WHERE p.ubigeo='1501';

INSERT INTO distrito (id_provincia, distrito, ubigeo)
SELECT p.id_provincia, 'SANTA ROSA', '150139'
FROM provincia p WHERE p.ubigeo='1501';

INSERT INTO distrito (id_provincia, distrito, ubigeo)
SELECT p.id_provincia, 'SANTIAGO DE SURCO', '150140'
FROM provincia p WHERE p.ubigeo='1501';

INSERT INTO distrito (id_provincia, distrito, ubigeo)
SELECT p.id_provincia, 'SURQUILLO', '150141'
FROM provincia p WHERE p.ubigeo='1501';

INSERT INTO distrito (id_provincia, distrito, ubigeo)
SELECT p.id_provincia, 'VILLA EL SALVADOR', '150142'
FROM provincia p WHERE p.ubigeo='1501';

INSERT INTO distrito (id_provincia, distrito, ubigeo)
SELECT p.id_provincia, 'VILLA MARÍA DEL TRIUNFO', '150143'
FROM provincia p WHERE p.ubigeo='1501';

select * from persona;
