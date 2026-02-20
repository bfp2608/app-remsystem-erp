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

    celular_corporativo VARCHAR(20),
    correo_corporativo VARCHAR(150),

    fecha_inicio_actividades DATE,
    actividad_economica VARCHAR(255),
    sitio_web VARCHAR(255),

    estado_empresa VARCHAR(50),
    estado_ruc VARCHAR(50),
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
    id_empresa_tipo BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    id_empresa BIGINT NOT NULL,
    tipo VARCHAR(100) NOT NULL,

    created_at TIMESTAMP(6) WITHOUT TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP(6) WITHOUT TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_empresa_tipo_empresa
        FOREIGN KEY (id_empresa)
        REFERENCES empresa(id_empresa)
        ON DELETE CASCADE
);

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

select * from usuario;

CREATE INDEX idx_empresa_distrito ON empresa(id_distrito);
CREATE INDEX idx_sucursal_empresa ON sucursal(id_empresa);
CREATE INDEX idx_persona_empresa ON persona(id_empresa);
CREATE INDEX idx_empresa_tipo_empresa ON empresa_tipo(id_empresa);
CREATE INDEX idx_usuario_tipo ON usuario(id_tipo_usuario);
