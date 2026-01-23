// utils/ubigeoData.ts

export interface Distrito {
    nombre: string;
}

export interface Provincia {
    nombre: string;
    distritos: Distrito[];
}

export interface Departamento {
    nombre: string;
    provincias: Provincia[];
}

// Datos completos de ubicaciones de Perú organizados jerárquicamente
export const departamentosData: Departamento[] = [
    {
        nombre: 'Lima',
        provincias: [
            {
                nombre: 'Lima',
                distritos: [
                    { nombre: 'Cercado de Lima' },
                    { nombre: 'Ancón' },
                    { nombre: 'Ate' },
                    { nombre: 'Barranco' },
                    { nombre: 'Breña' },
                    { nombre: 'Carabayllo' },
                    { nombre: 'Chaclacayo' },
                    { nombre: 'Chorrillos' },
                    { nombre: 'Cieneguilla' },
                    { nombre: 'Comas' },
                    { nombre: 'El Agustino' },
                    { nombre: 'Independencia' },
                    { nombre: 'Jesús María' },
                    { nombre: 'La Molina' },
                    { nombre: 'La Victoria' },
                    { nombre: 'Lince' },
                    { nombre: 'Los Olivos' },
                    { nombre: 'Lurigancho' },
                    { nombre: 'Lurín' },
                    { nombre: 'Magdalena del Mar' },
                    { nombre: 'Miraflores' },
                    { nombre: 'Pachacámac' },
                    { nombre: 'Pucusana' },
                    { nombre: 'Pueblo Libre' },
                    { nombre: 'Puente Piedra' },
                    { nombre: 'Punta Hermosa' },
                    { nombre: 'Punta Negra' },
                    { nombre: 'Rímac' },
                    { nombre: 'San Bartolo' },
                    { nombre: 'San Borja' },
                    { nombre: 'San Isidro' },
                    { nombre: 'San Juan de Lurigancho' },
                    { nombre: 'San Juan de Miraflores' },
                    { nombre: 'San Luis' },
                    { nombre: 'San Martín de Porres' },
                    { nombre: 'San Miguel' },
                    { nombre: 'Santa Anita' },
                    { nombre: 'Santa María del Mar' },
                    { nombre: 'Santa Rosa' },
                    { nombre: 'Santiago de Surco' },
                    { nombre: 'Surquillo' },
                    { nombre: 'Villa El Salvador' },
                    { nombre: 'Villa María del Triunfo' }
                ]
            },
            {
                nombre: 'Barranca',
                distritos: [
                    { nombre: 'Barranca' },
                    { nombre: 'Paramonga' },
                    { nombre: 'Pativilca' },
                    { nombre: 'Supe' },
                    { nombre: 'Supe Puerto' }
                ]
            },
            {
                nombre: 'Cajatambo',
                distritos: [
                    { nombre: 'Cajatambo' },
                    { nombre: 'Copa' },
                    { nombre: 'Gorgor' },
                    { nombre: 'Huancapón' },
                    { nombre: 'Manás' }
                ]
            },
            {
                nombre: 'Canta',
                distritos: [
                    { nombre: 'Canta' },
                    { nombre: 'Arahuay' },
                    { nombre: 'Huamantanga' },
                    { nombre: 'Huaros' },
                    { nombre: 'Lachaqui' },
                    { nombre: 'San Buenaventura' },
                    { nombre: 'Santa Rosa de Quives' }
                ]
            },
            {
                nombre: 'Cañete',
                distritos: [
                    { nombre: 'San Vicente de Cañete' },
                    { nombre: 'Asia' },
                    { nombre: 'Calango' },
                    { nombre: 'Cerro Azul' },
                    { nombre: 'Chilca' },
                    { nombre: 'Coayllo' },
                    { nombre: 'Imperial' },
                    { nombre: 'Lunahuaná' },
                    { nombre: 'Mala' },
                    { nombre: 'Nuevo Imperial' },
                    { nombre: 'Pacaran' },
                    { nombre: 'Quilmaná' },
                    { nombre: 'San Antonio' },
                    { nombre: 'San Luis' },
                    { nombre: 'Santa Cruz de Flores' },
                    { nombre: 'Zúñiga' }
                ]
            },
            {
                nombre: 'Huaral',
                distritos: [
                    { nombre: 'Huaral' },
                    { nombre: 'Atavillos Alto' },
                    { nombre: 'Atavillos Bajo' },
                    { nombre: 'Aucallama' },
                    { nombre: 'Chancay' },
                    { nombre: 'Ihuari' },
                    { nombre: 'Lampian' },
                    { nombre: 'Pacaraos' },
                    { nombre: 'San Miguel de Acos' },
                    { nombre: 'Santa Cruz de Andamarca' },
                    { nombre: 'Sumbilca' },
                    { nombre: 'Veintisiete de Noviembre' }
                ]
            },
            {
                nombre: 'Huarochirí',
                distritos: [
                    { nombre: 'Matucana' },
                    { nombre: 'Antioquia' },
                    { nombre: 'Callahuanca' },
                    { nombre: 'Carampoma' },
                    { nombre: 'Chicla' },
                    { nombre: 'Cuenca' },
                    { nombre: 'Huachupampa' },
                    { nombre: 'Huanza' },
                    { nombre: 'Huarochirí' },
                    { nombre: 'Lahuaytambo' },
                    { nombre: 'Langa' },
                    { nombre: 'Laraos' },
                    { nombre: 'Mariatana' },
                    { nombre: 'Ricardo Palma' },
                    { nombre: 'San Andrés de Tupicocha' },
                    { nombre: 'San Antonio' },
                    { nombre: 'San Bartolomé' },
                    { nombre: 'San Damián' },
                    { nombre: 'San Juan de Iris' },
                    { nombre: 'San Juan de Tantaranche' },
                    { nombre: 'San Lorenzo de Quinti' },
                    { nombre: 'San Mateo' },
                    { nombre: 'San Mateo de Otao' },
                    { nombre: 'San Pedro de Casta' },
                    { nombre: 'San Pedro de Huancayre' },
                    { nombre: 'Sangallaya' },
                    { nombre: 'Santa Cruz de Cocachacra' },
                    { nombre: 'Santa Eulalia' },
                    { nombre: 'Santiago de Anchucaya' },
                    { nombre: 'Santiago de Tuna' },
                    { nombre: 'Santo Domingo de los Olleros' },
                    { nombre: 'Surco' }
                ]
            },
            {
                nombre: 'Huaura',
                distritos: [
                    { nombre: 'Huacho' },
                    { nombre: 'Ambar' },
                    { nombre: 'Caleta de Carquin' },
                    { nombre: 'Checras' },
                    { nombre: 'Hualmay' },
                    { nombre: 'Huaura' },
                    { nombre: 'Leoncio Prado' },
                    { nombre: 'Paccho' },
                    { nombre: 'Santa Leonor' },
                    { nombre: 'Santa María' },
                    { nombre: 'Sayan' },
                    { nombre: 'Vegueta' }
                ]
            },
            {
                nombre: 'Oyón',
                distritos: [
                    { nombre: 'Oyón' },
                    { nombre: 'Andajes' },
                    { nombre: 'Caujul' },
                    { nombre: 'Cochamarca' },
                    { nombre: 'Navan' },
                    { nombre: 'Pachangara' }
                ]
            },
            {
                nombre: 'Yauyos',
                distritos: [
                    { nombre: 'Yauyos' },
                    { nombre: 'Alis' },
                    { nombre: 'Allauca' },
                    { nombre: 'Ayaviri' },
                    { nombre: 'Azángaro' },
                    { nombre: 'Cacra' },
                    { nombre: 'Carania' },
                    { nombre: 'Catahuasi' },
                    { nombre: 'Chocos' },
                    { nombre: 'Cochas' },
                    { nombre: 'Colonia' },
                    { nombre: 'Hongos' },
                    { nombre: 'Huampara' },
                    { nombre: 'Huancaya' },
                    { nombre: 'Huangascar' },
                    { nombre: 'Huantan' },
                    { nombre: 'Huañec' },
                    { nombre: 'Laraos' },
                    { nombre: 'Lincha' },
                    { nombre: 'Madean' },
                    { nombre: 'Miraflores' },
                    { nombre: 'Omas' },
                    { nombre: 'Putinza' },
                    { nombre: 'Quinches' },
                    { nombre: 'Quinocay' },
                    { nombre: 'San Joaquín' },
                    { nombre: 'San Pedro de Pilas' },
                    { nombre: 'Tanta' },
                    { nombre: 'Tauripampa' },
                    { nombre: 'Tomas' },
                    { nombre: 'Tupe' },
                    { nombre: 'Viñac' },
                    { nombre: 'Vitis' }
                ]
            }
        ]
    },
    {
        nombre: 'Arequipa',
        provincias: [
            {
                nombre: 'Arequipa',
                distritos: [
                    { nombre: 'Arequipa' },
                    { nombre: 'Alto Selva Alegre' },
                    { nombre: 'Cayma' },
                    { nombre: 'Cerro Colorado' },
                    { nombre: 'Characato' },
                    { nombre: 'Chiguata' },
                    { nombre: 'Jacobo Hunter' },
                    { nombre: 'José Luis Bustamante y Rivero' },
                    { nombre: 'La Joya' },
                    { nombre: 'Mariano Melgar' },
                    { nombre: 'Miraflores' },
                    { nombre: 'Mollebaya' },
                    { nombre: 'Paucarpata' },
                    { nombre: 'Pocsi' },
                    { nombre: 'Polobaya' },
                    { nombre: 'Quequeña' },
                    { nombre: 'Sabandia' },
                    { nombre: 'Sachaca' },
                    { nombre: 'San Juan de Siguas' },
                    { nombre: 'San Juan de Tarucani' },
                    { nombre: 'Santa Isabel de Siguas' },
                    { nombre: 'Santa Rita de Siguas' },
                    { nombre: 'Socabaya' },
                    { nombre: 'Tiabaya' },
                    { nombre: 'Uchumayo' },
                    { nombre: 'Vitor' },
                    { nombre: 'Yanahuara' },
                    { nombre: 'Yarabamba' },
                    { nombre: 'Yura' }
                ]
            },
            {
                nombre: 'Camaná',
                distritos: [
                    { nombre: 'Camaná' },
                    { nombre: 'José María Quimper' },
                    { nombre: 'Mariano Nicolás Valcárcel' },
                    { nombre: 'Mariscal Cáceres' },
                    { nombre: 'Nicolás de Pierola' },
                    { nombre: 'Ocoña' },
                    { nombre: 'Quilca' },
                    { nombre: 'Samuel Pastor' }
                ]
            },
            {
                nombre: 'Caravelí',
                distritos: [
                    { nombre: 'Caravelí' },
                    { nombre: 'Acarí' },
                    { nombre: 'Atico' },
                    { nombre: 'Atiquipa' },
                    { nombre: 'Bella Unión' },
                    { nombre: 'Cahuacho' },
                    { nombre: 'Chala' },
                    { nombre: 'Chaparra' },
                    { nombre: 'Huanuhuanu' },
                    { nombre: 'Jaqui' },
                    { nombre: 'Lomas' },
                    { nombre: 'Quicacha' },
                    { nombre: 'Yauca' }
                ]
            }
        ]
    },
    {
        nombre: 'Cusco',
        provincias: [
            {
                nombre: 'Cusco',
                distritos: [
                    { nombre: 'Cusco' },
                    { nombre: 'Ccorca' },
                    { nombre: 'Poroy' },
                    { nombre: 'San Jerónimo' },
                    { nombre: 'San Sebastián' },
                    { nombre: 'Santiago' },
                    { nombre: 'Saylla' },
                    { nombre: 'Wanchaq' }
                ]
            },
            {
                nombre: 'Urubamba',
                distritos: [
                    { nombre: 'Urubamba' },
                    { nombre: 'Chinchero' },
                    { nombre: 'Huayllabamba' },
                    { nombre: 'Machupicchu' },
                    { nombre: 'Maras' },
                    { nombre: 'Ollantaytambo' },
                    { nombre: 'Yucay' }
                ]
            }
        ]
    },
    {
        nombre: 'La Libertad',
        provincias: [
            {
                nombre: 'Trujillo',
                distritos: [
                    { nombre: 'Trujillo' },
                    { nombre: 'El Porvenir' },
                    { nombre: 'Florencia de Mora' },
                    { nombre: 'Huanchaco' },
                    { nombre: 'La Esperanza' },
                    { nombre: 'Laredo' },
                    { nombre: 'Moche' },
                    { nombre: 'Poroto' },
                    { nombre: 'Salaverry' },
                    { nombre: 'Simbal' },
                    { nombre: 'Victor Larco Herrera' }
                ]
            }
        ]
    },
    {
        nombre: 'Piura',
        provincias: [
            {
                nombre: 'Piura',
                distritos: [
                    { nombre: 'Piura' },
                    { nombre: 'Castilla' },
                    { nombre: 'Catacaos' },
                    { nombre: 'Cura Mori' },
                    { nombre: 'El Tallán' },
                    { nombre: 'La Arena' },
                    { nombre: 'La Unión' },
                    { nombre: 'Las Lomas' },
                    { nombre: 'Tambo Grande' }
                ]
            },
            {
                nombre: 'Sullana',
                distritos: [
                    { nombre: 'Sullana' },
                    { nombre: 'Bellavista' },
                    { nombre: 'Ignacio Escudero' },
                    { nombre: 'Lancones' },
                    { nombre: 'Marcavelica' },
                    { nombre: 'Miguel Checa' },
                    { nombre: 'Querecotillo' },
                    { nombre: 'Salitral' }
                ]
            }
        ]
    },
    {
        nombre: 'Callao',
        provincias: [
            {
                nombre: 'Callao',
                distritos: [
                    { nombre: 'Callao' },
                    { nombre: 'Bellavista' },
                    { nombre: 'Carmen de la Legua Reynoso' },
                    { nombre: 'La Perla' },
                    { nombre: 'La Punta' },
                    { nombre: 'Mi Perú' },
                    { nombre: 'Ventanilla' }
                ]
            }
        ]
    },
    {
        nombre: 'Lambayeque',
        provincias: [
            {
                nombre: 'Chiclayo',
                distritos: [
                    { nombre: 'Chiclayo' },
                    { nombre: 'Chongoyape' },
                    { nombre: 'Eten' },
                    { nombre: 'Eten Puerto' },
                    { nombre: 'José Leonardo Ortiz' },
                    { nombre: 'La Victoria' },
                    { nombre: 'Lagunas' },
                    { nombre: 'Monsefú' },
                    { nombre: 'Nueva Arica' },
                    { nombre: 'Oyotún' },
                    { nombre: 'Pátapo' },
                    { nombre: 'Picsi' },
                    { nombre: 'Pimentel' },
                    { nombre: 'Pomalca' },
                    { nombre: 'Pucalá' },
                    { nombre: 'Reque' },
                    { nombre: 'Santa Rosa' },
                    { nombre: 'Saña' },
                    { nombre: 'Tumán' }
                ]
            }
        ]
    },
    {
        nombre: 'Áncash',
        provincias: [
            {
                nombre: 'Huaraz',
                distritos: [
                    { nombre: 'Huaraz' },
                    { nombre: 'Cochabamba' },
                    { nombre: 'Colcabamba' },
                    { nombre: 'Huanchay' },
                    { nombre: 'Independencia' },
                    { nombre: 'Jangas' },
                    { nombre: 'La Libertad' },
                    { nombre: 'Olleros' },
                    { nombre: 'Pampas Grande' },
                    { nombre: 'Pariacoto' },
                    { nombre: 'Pira' },
                    { nombre: 'Tarica' }
                ]
            }
        ]
    },
    {
        nombre: 'Junín',
        provincias: [
            {
                nombre: 'Huancayo',
                distritos: [
                    { nombre: 'Huancayo' },
                    { nombre: 'Carhuacallanga' },
                    { nombre: 'Chacapampa' },
                    { nombre: 'Chicche' },
                    { nombre: 'Chilca' },
                    { nombre: 'Chongos Alto' },
                    { nombre: 'Chupuro' },
                    { nombre: 'Colca' },
                    { nombre: 'Cullhuas' },
                    { nombre: 'El Tambo' },
                    { nombre: 'Huacrapuquio' },
                    { nombre: 'Hualhuas' },
                    { nombre: 'Huancan' },
                    { nombre: 'Huasicancha' },
                    { nombre: 'Huayucachi' },
                    { nombre: 'Ingenio' },
                    { nombre: 'Pariahuanca' },
                    { nombre: 'Pilcomayo' },
                    { nombre: 'Pucara' },
                    { nombre: 'Quichuay' },
                    { nombre: 'Quilcas' },
                    { nombre: 'San Agustín' },
                    { nombre: 'San Jerónimo de Tunan' },
                    { nombre: 'Saño' },
                    { nombre: 'Sapallanga' },
                    { nombre: 'Sicaya' },
                    { nombre: 'Santo Domingo de Acobamba' },
                    { nombre: 'Viques' }
                ]
            }
        ]
    },
    {
        nombre: 'Ica',
        provincias: [
            {
                nombre: 'Ica',
                distritos: [
                    { nombre: 'Ica' },
                    { nombre: 'La Tinguiña' },
                    { nombre: 'Los Aquijes' },
                    { nombre: 'Ocucaje' },
                    { nombre: 'Pachacutec' },
                    { nombre: 'Parcona' },
                    { nombre: 'Pueblo Nuevo' },
                    { nombre: 'Salas' },
                    { nombre: 'San José de Los Molinos' },
                    { nombre: 'San Juan Bautista' },
                    { nombre: 'Santiago' },
                    { nombre: 'Subtanjalla' },
                    { nombre: 'Tate' },
                    { nombre: 'Yauca del Rosario' }
                ]
            }
        ]
    }
];

/**
 * Obtener todos los nombres de departamentos
 */
export const obtenerDepartamentos = (): string[] => {
    return departamentosData.map(dep => dep.nombre);
};

/**
 * Obtener provincias de un departamento específico
 */
export const obtenerProvinciasPorDepartamento = (departamento: string): string[] => {
    const dep = departamentosData.find(d => d.nombre === departamento);
    if (!dep) return [];
    return dep.provincias.map(prov => prov.nombre);
};

/**
 * Obtener distritos de una provincia específica
 */
export const obtenerDistritosPorProvincia = (departamento: string, provincia: string): string[] => {
    const dep = departamentosData.find(d => d.nombre === departamento);
    if (!dep) return [];
    
    const prov = dep.provincias.find(p => p.nombre === provincia);
    if (!prov) return [];
    
    return prov.distritos.map(dist => dist.nombre);
};