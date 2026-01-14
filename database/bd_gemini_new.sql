CREATE DATABASE bd_gemini
use bd_gemini;

create table USUARIO(
	id_usuario int not null identity(1,1) primary key,
	razon_social varchar(100) not null,
	email varchar(100) unique not null,
	contrasenia varchar(16),
	fecha_registro_sistema date default getDate(),
	codigo varchar(8) unique not null,
	tipo_usuario varchar(100) check(tipo_usuario in ('Administrador','Cliente')) default 'Cliente',
	num_identificacion varchar(11) unique not null,
	celular varchar(15) unique not null,
	tipo_identificacion varchar(50) check(tipo_identificacion in ('RUC','DNI','CARNET DE EXTRANJERIA'))
);

create table ADMINISTRADOR(
	id_administrador int identity(1,1) primary key,
	id_usuario int not null,
	permisos bit,
	nivel_administrador varchar(100) check(nivel_administrador in ('Super Admin','Admin','Admin B�sico')),
	foreign key (id_usuario) references usuario(id_usuario)
);

create table CLIENTE(
	id_cliente int identity(1,1) primary key  not null,
	id_usuario int not null,
	domicilio_fiscal varchar(30),
	distrito varchar(20),
	provincia varchar(20),
	departamento varchar(20),
	pais varchar(15) default 'Peru',
	fecha_inicio_actividades date,
	tipo_cliente varchar(40) check(tipo_cliente in ('Empresa','Persona')),
	foreign key (id_usuario) references usuario(id_usuario)
);

create table EMPRESA(
	id_empresa int identity(1,1) primary key not null,
	id_cliente int not null,
	sitio_web text,
	actividad_economica varchar(100),
	nombre_comercial varchar(100),
	tipo_empresa varchar(100) check(tipo_empresa in ('S.A.','S.A.C.','S.A.A.','S.R.L.','E.I.R.L.')),
	foreign key (id_cliente) references cliente(id_cliente)
);

create table PERSONA(
	id_persona int identity(1,1) primary key not null,
	id_cliente int not null,
	grado_academico varchar(100) check(grado_academico in ('Sin instruccion','Secundaria completa','Superior t�cnica','Superior Universitaria')),
	rol_empresa varchar(100),
	experiencia int,
	edad int,
	ocupacion varchar(100)
	foreign key (id_cliente) references cliente(id_cliente)
);
