//El círculo del avatar recibe un nombre
//Separa las letras y elige un color para mostrar


//Generar hash simple del nombre completo
const generarHash = (texto: string) => {
    let hash = 0
    for (let i = 0; i < texto.length; i++) {
        hash = texto.charCodeAt(i) + ((hash << 5) - hash)
    }
    return Math.abs(hash)
}

//Colores disponibles
const colores = [
    "bg-blue-600",
    "bg-sky-600",
    "bg-cyan-600",
    "bg-teal-600",
    "bg-emerald-600",
    "bg-green-600",
    "bg-lime-600",
    "bg-amber-600",
    "bg-orange-600",
    "bg-rose-600",
    "bg-pink-600",
    "bg-fuchsia-600",
    "bg-violet-600",
    "bg-purple-600",
    "bg-indigo-600"
]

//COMPONENTE

type PropAvatar = {
    nombre : string;
}

export function CirculoAvatar({nombre}:PropAvatar) {

    //------------------------------------------
    const nombreSeguro = nombre?.trim() || "#"

    const iniciales = nombreSeguro
        .trim()
        .split(" ")
        .filter(Boolean)
        .map(palabra => palabra[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()

    const hash = generarHash(nombreSeguro)
    const colorClase = colores[hash % colores.length]
    //------------------------------------------

    return (
        <div className={`w-8 h-8 ${colorClase} rounded-full flex items-center justify-center text-white font-semibold mr-3`}>
            {iniciales}
        </div>
    )
}