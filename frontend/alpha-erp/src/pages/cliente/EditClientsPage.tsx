import { useEffect, useRef, useState } from "react";
import { AvatarFoto } from "../../components/AvatarFoto";
import { InputForm } from "../../components/editClientPage/InputForm"
import { SelectForm } from "../../components/editClientPage/SelectForm";
import { ContactCard } from "../../components/editClientPage/ContactCard";
import { CreateContactModal } from "../../components/editClientPage/CreateContactModal";
import { EditContactModal, Contact } from "../../components/editClientPage/EditContactModal";

export function EditClientsPage() {
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const [tagInput, setTagInput] = useState("");
  const [showTagDropdown, setShowTagDropdown] = useState(false);
  const [tags, setTags] = useState<string[]>(["8510 / ENSEÑANZA PREESCOLAR..."]);
  const [tipoCliente, setTipoCliente] = useState<"persona" | "empresa">("empresa");
  const countryRef = useRef<HTMLDivElement>(null);
  const tagsRef = useRef<HTMLDivElement>(null);
  const [website, setWebsite] = useState("");
  const [activeTab, setActiveTab] = useState("Contactos");
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);

  type ModalType = "edit" | "create" | null;
  // Ventana modal para crear nuevo contacto o editar contacto existente
  const [activeModal, setActiveModal] = useState<ModalType>(null);
  const closeModal = () => setActiveModal(null);

  // Manejar sucursales dinámicas
  const [sucursales, setSucursales] = useState([
    { nombre: "", direccion: "", distrito: "" }
  ]);

  const addSucursal = () => {
    if (sucursales.length < 3) {
      setSucursales([...sucursales, { nombre: "", direccion: "", distrito: "" }]);
    }
  };

  const handleSucursalChange = (index: number, field: string, value: string) => {
    const nuevas = [...sucursales];
    nuevas[index] = { ...nuevas[index], [field]: value };
    setSucursales(nuevas);
  };
  // Manejar teléfonos dinámicos 
  const [telefonos, setTelefonos] = useState<string[]>([""]); // Inicia con un campo vacío
  const handlePhoneChange = (index: number, value: string) => {
    const soloNumeros = value.replace(/\D/g, "");
    if (soloNumeros.length <= 9) {
      const nuevosTelefonos = [...telefonos];
      nuevosTelefonos[index] = soloNumeros;
      setTelefonos(nuevosTelefonos);
    }
  };
  const addPhoneField = () => {
    if (telefonos.length < 3) {
      setTelefonos([...telefonos, ""]);
    }
  };
  const removePhoneField = (index: number) => {
    setTelefonos(telefonos.filter((_, i) => i !== index));
  };
  // Manejar los checkboxs de tipo cliente/proveedor
  const [tipos, setTipos] = useState({
    proveedor: false,
    cliente: false,
  });

  const handleTipoChange = (name: keyof typeof tipos) => {
    setTipos((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };
  // Cerrar dropdowns al hacer clic fuera
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (countryRef.current && !countryRef.current.contains(e.target as Node)) {
        setShowCountryDropdown(false);
      }
      if (tagsRef.current && !tagsRef.current.contains(e.target as Node)) {
        setShowTagDropdown(false);
      }
    };
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);
  // Manejar actividades económicas (tags)
  const addTag = (text: string) => {
    if (tags.length < 3) {
      setTags((prev) => [...prev, text]);
      setTagInput("");
      setShowTagDropdown(false);
    } else {
      console.log("Máximo 3 actividades permitidas");
      setShowTagDropdown(false);
    }
  };

  const removeTag = (index: number) => {
    setTags((prev) => prev.filter((_, i) => i !== index));
  };

  const availableTags = ["0111", "0112", "0113"];

  return (
    <div className="bg-gray-800 text-gray-200 font-sans min-h-screen">
      <div className="w-full bg-gray-800 p-8 min-h-screen text-gray-300 font-sans">

        {/* Cabecera: foto + nombre + contacto */}
        <div className="flex flex-col md:flex-row gap-8 mb-10">
          {/* Avatar / foto */}
          <AvatarFoto tipo={tipoCliente} />
          {/* Nombre y campos de contacto */}
          <div className="flex-1">
            <div className="flex items-center gap-4 mb-2 text-sm">
              <label className="flex items-center gap-1 cursor-pointer">
                <input 
                  type="radio" 
                  name="tipo" 
                  className="accent-teal-500" 
                  checked={tipoCliente === "persona"}
                  onChange={() => setTipoCliente("persona")}
                /> Persona
              </label>
              <label className="flex items-center gap-1 cursor-pointer">
                <input 
                  type="radio" 
                  name="tipo" 
                  className="accent-teal-500"
                  checked={tipoCliente === "empresa"}
                  onChange={() => setTipoCliente("empresa")} />
                <span className={tipoCliente === "empresa" ? "text-teal-400 font-medium" : ""}>Empresa</span>
              </label>
            </div>

            <div className="flex items-center border-b border-transparent hover:border-gray-600 focus-within:border-teal-500 transition-colors mb-4 w-full lg:w-2/3">
              <input
                  type="text"
                  className="text-3xl bg-transparent border-none outline-none w-full text-white focus:ring-0 font-semibold py-1"
                  placeholder={tipoCliente === "empresa" ? "Razón social..." : "Nombre completo..."}  />
            </div>

            <div className="space-y-2">
              {/* Email */}
              <div className="flex items-center gap-3 border-b border-transparent hover:border-gray-600 focus-within:border-teal-500 transition-colors w-full lg:w-1/2">
                <span className="text-pink-700">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                  </svg>
                </span>
                <input
                  type="email"
                  className="bg-transparent border-none outline-none w-full text-gray-300 placeholder-gray-500 focus:ring-0 text-base py-1"
                  placeholder="Correo electrónico" />
              </div>

              {/* Contenedor de Teléfonos dinámicos */}
              <div className="flex flex-wrap gap-3 w-full lg:w-3/4"> 
                {telefonos.map((tel, index) => (
                  <div 
                    key={index} 
                    className="flex items-center gap-3 border-b border-transparent hover:border-gray-600 focus-within:border-teal-500 transition-colors min-w-[200px] flex-1 max-w-[300px]" >
                    <span className="text-pink-700">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </span>
                    <input
                    type="tel" // Mantiene el tipo tel para semántica
                    inputMode="numeric" // Abre teclado numérico en móviles
                    value={tel}
                    onChange={(e) => handlePhoneChange(index, e.target.value)}
                    className="bg-transparent border-none outline-none w-full text-gray-300 placeholder-gray-500 focus:ring-0 text-base py-1"
                    placeholder="Teléfono" />
                    
                    {/* Botón para eliminar */}
                    {telefonos.length > 1 && (
                      <button onClick={() => removePhoneField(index)} className="text-gray-500 hover:text-red-500 text-xs px-1" >
                        ✕ </button>
                    )}
                  </div>
                ))}

                {/* Botón para agregar (siempre al final de la fila o debajo si no hay espacio) */}
                {telefonos.length < 3 && (
                  <button onClick={addPhoneField} className="text-teal-500 text-xs font-bold flex items-center gap-1 hover:text-teal-400 self-center h-8 cursor-pointer" >
                    <span className="text-lg">+</span> Añadir
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Grid de campos */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-x-20 gap-y-6 mt-10 text-sm">

          {/* Columna izquierda: */}
          <div className="space-y-1 mb-2">
            {tipoCliente === "empresa" ? (
              <>
                {/* Campos exclusivos de Empresa */}
                <InputForm label="Nombre Comercial" placeholder="RemSystems SAC" />
                <InputForm label="RUC" placeholder="20102542136" />
              </>
            ) : (
              <>
                {/* Campos exclusivos de Persona */}
                <InputForm label="Empresa" placeholder="Nombre de la empresa" />
                <InputForm label="Puesto de trabajo" placeholder="Por ejemplo, director de ventas" />
              </>
            )}

            {/* Son comunes en ambos */}
            {/* Tipo con Checkboxs */}
            <div className="flex items-start">
              <span className="w-34 font-bold text-gray-300 shrink-0 pt-1">Tipo</span>
              <div className="flex gap-6 pt-1 pb-1">
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={tipos.proveedor}
                    onChange={() => handleTipoChange("proveedor")}
                    className="w-4 h-4 rounded border-gray-600 bg-transparent text-teal-500 focus:ring-teal-500 focus:ring-offset-gray-800 accent-teal-500" />
                  <span className={`text-base transition-colors ${tipos.proveedor ? "text-teal-400" : "text-gray-400 group-hover:text-gray-200"}`}>
                    Proveedor </span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={tipos.cliente}
                    onChange={() => handleTipoChange("cliente")}
                    className="w-4 h-4 rounded border-gray-600 bg-transparent text-teal-500 focus:ring-teal-500 focus:ring-offset-gray-800 accent-teal-500"  />
                  <span className={`text-base transition-colors ${tipos.cliente ? "text-teal-400" : "text-gray-400 group-hover:text-gray-200"}`}>
                    Cliente </span>
                </label>
              </div>
            </div>
            {/* Sección Sucursales Dinámicas */}
            <div className="flex items-start">
              <div className="w-34 shrink-0 pt-1">
                <span className="font-bold text-gray-300">Sucursal</span>
                {/* Botón para añadir más sucursales */}
                {sucursales.length < 3 && (
                  <button 
                    onClick={addSucursal}
                    className="block text-teal-500 font-bold hover:text-teal-400 mt-2 tracking-wider text-xs cursor-pointer">
                    <span className="text-lg">+</span> Añadir Sucursal
                  </button>
                )}
              </div>

              <div className="flex-1 space-y-8"> {/* space-y-8 separa cada bloque de sucursal */}
                {sucursales.map((sucursal, index) => (
                  <div key={index} className="space-y-2 relative group/sucursal">
                    {/* Nombre de Sucursal */}
                    <div className="border-b border-transparent hover:border-gray-600 focus-within:border-teal-500 transition-colors">
                      <input
                        type="text"
                        value={sucursal.nombre}
                        onChange={(e) => handleSucursalChange(index, "nombre", e.target.value)}
                        className="bg-transparent border-none outline-none w-full text-gray-300 placeholder-gray-500 focus:ring-0 text-base py-1"
                        placeholder={index === 0 ? "Nombre de Sucursal" : `Nombre de Sucursal ${index + 1}`} />
                    </div>
                    {/* Dirección */}
                    <div className="border-b border-transparent hover:border-gray-600 focus-within:border-teal-500 transition-colors">
                      <input
                        type="text"
                        value={sucursal.direccion}
                        onChange={(e) => handleSucursalChange(index, "direccion", e.target.value)}
                        className="bg-transparent border-none outline-none w-full text-gray-300 placeholder-gray-500 focus:ring-0 text-base py-1"
                        placeholder="Dirección (Calle, Número, etc.)" />
                    </div>
                    {/* Contenedor de Ubicación */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 pt-1">
                      <SelectForm label="Distrito" options={["Ancón", "Miraflores", "Surco"]} />
                      <SelectForm label="Provincia" options={["Lima", "Callao"]} />
                      <SelectForm label="Departamento" options={["Lima", "Callao"]} />
                      <SelectForm label="País" options={["Perú", "Ecuador", "Colombia"]} />
                    </div>
                    {/* Botón eliminar (solo si hay más de una) */}
                    {sucursales.length > 1 && (
                      <button 
                        onClick={() => setSucursales(sucursales.filter((_, i) => i !== index))}
                        className="absolute -right-6 top-1 text-gray-600 hover:text-red-500">
                        ✕ </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Columna derecha: */}
          <div className="space-y-4 mb-2">
            {/* Fecha de inicio de actividades */}  
            <div className="flex items-start">
              <span className="w-34 font-bold text-gray-300 shrink-0 pt-1">
                Fecha de inicio de actividades </span>
              <div className="flex items-center border-b border-transparent hover:border-gray-600 focus-within:border-teal-500 transition-colors pb-1 relative">
                <input
                  type="date"
                  className="bg-transparent pt-2 border-none outline-none w-full text-gray-300 focus:ring-0 text-base scheme-dark z-10
                            [&::-webkit-calendar-picker-indicator]:opacity-0" />
                {/* Icono de reemplazo */}
                <span className="absolute right-0 text-teal-500 pointer-events-none">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </span>
              </div>
            </div>
            
            {/* Sitio web con Redirección */}
            <div className="flex items-start group relative">
              <span className="w-34 font-bold text-gray-300 shrink-0 pt-1">Sitio web</span>
              <div className="flex-1 flex items-center border-b border-transparent hover:border-gray-600 focus-within:border-teal-500 transition-colors pb-1">
                <input
                  type="text"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  className="bg-transparent border-none outline-none w-full text-gray-300 placeholder-gray-500 focus:ring-0 text-base py-1"
                  placeholder="Por ejemplo, www.odoo.com" />
                
                <div className="relative flex items-center justify-center">
                  <a 
                    // Lógica para asegurar que tenga http:// si no lo tiene
                    href={website.startsWith('http') ? website : `https://${website}`}
                    target="_blank" // Abre en pestaña nueva
                    rel="noopener noreferrer" // Seguridad para pestañas nuevas
                    className={`ml-2 transition-colors ${website ? 'text-teal-500 hover:text-teal-300' : 'text-gray-600 pointer-events-none'}`} >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                    </svg>
                  </a>

                  {/* Tooltip */}
                  {website && (
                    <div className="absolute bottom-full mb-2 hidden group-hover:flex flex-col items-center">
                      <span className="relative z-10 p-2 text-xs text-white whitespace-nowrap bg-gray-700 shadow-lg rounded-md">
                        Ir a URL </span>
                      <div className="w-3 h-3 -mt-2 rotate-45 bg-gray-700"></div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            {/* Actividades económicas */}
            <div className="flex items-star">
              <span className="w-34 font-bold text-gray-300 shrink-0 pt-1">Actividades económicas</span>
              <div className="flex-1 relative" ref={tagsRef}>
                <div
                  className="flex flex-wrap gap-2 items-center border-b border-gray-600 hover:border-teal-500 focus-within:border-teal-500 min-h-[32px] pb-1 transition-colors cursor-text"
                  onClick={() => setShowTagDropdown(true)} >
                  {tags.map((tag, i) => (
                    <div key={i}
                      className="bg-[#1f4b4e] text-teal-300 px-3 py-0.5 rounded-full text-xs flex items-center gap-2 border border-teal-800" >
                      {tag}
                      <button className="hover:text-white font-bold"
                        onClick={(e) => { e.stopPropagation(); removeTag(i); }} >
                        ✕ </button>
                    </div>
                  ))}
                  <input
                    type="text"
                    className={`bg-transparent border-none outline-none text-gray-300 flex-1 min-w-[60px] focus:ring-0 text-sm ${tags.length >= 3 ? "cursor-not-allowed opacity-50" : ""}`}
                    value={tagInput}
                    placeholder={tags.length >= 3 ? "Límite alcanzado" : ""}
                    disabled={tags.length >= 3} // Bloquea el teclado
                    onChange={(e) => setTagInput(e.target.value)}
                    onFocus={() => tags.length < 3 && setShowTagDropdown(true)} />
                </div>
                {showTagDropdown && (
                  <div className="absolute left-0 top-full mt-1 w-full bg-[#2d333e] border border-gray-700 shadow-2xl z-50 rounded-sm overflow-hidden">
                    {availableTags.map((tag) => (
                      <div
                        key={tag}
                        className="hover:bg-[#363d4a] p-2 text-sm text-gray-300 cursor-pointer border-b border-gray-700"
                        onClick={() => addTag(tag)} >
                        {tag}
                      </div>
                    ))}
                    <div className="p-2 text-sm text-teal-400 cursor-pointer font-medium hover:bg-[#363d4a]">
                      Buscar más...
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            {tipoCliente === "empresa" ? (
              <>
                {/* Condición */}
                <div className="flex items-center">
                    <span className="w-34 font-bold text-gray-300 shrink-0 pt-1">Condición</span>
                     <SelectForm label="Habido" options={["No Habido"]} />
                </div>
              </>
            ) : ( <></> )}           
          </div>
        </div>
        {/* Tabs con lógica de estado */}
        <div className="flex bg-[#2d333e] border-y border-gray-700 overflow-x-auto mt-3">
          {["Contactos", "Ventas y compras", "Asignación de socio", "Notas"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-10 py-4 text-sm font-bold transition-colors whitespace-nowrap ${
                activeTab === tab 
                ? "border-b-2 border-pink-500 text-pink-500 bg-[#252a34]" 
                : "text-gray-400 hover:bg-[#363d4a] hover:text-white border-b-2 border-transparent"
              }`} >
              {tab}
            </button>
          ))}
        </div>
        {/* Contenido Dinámico de Pestañas */}
        <div className="p-8">
          {activeTab === "Contactos" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 animate-fadeIn"> 
              <button 
                onClick={() => {
                  setSelectedContact({
                    name: "CHRISTY ANGELA RODRIGUEZ OBESO",
                    email: "c.rodriguez@uct.edu.pe",
                    telefono: "+51 958632589",
                    position: "DIRECTOR",
                    color: "bg-[#a832a4]"
                  });
                  setActiveModal("edit"); 
                }}
                className="cursor-pointer gap-5 animate-fadeIn"
                >
                <ContactCard 
                  name="CHRISTY ANGELA RODRIGUEZ OBESO"
                  email="c.rodriguez@uct.edu.pe"
                  telefono="+51 958632589"
                  position="DIRECTOR"
                  color="bg-[#a832a4]"/>
              </button>
              <button
                //Al hacer clic en cada contacto tendría su propio modal para agregar nuevo contacto
                onClick={() => setActiveModal("create")}
                className="cursor-pointer bg-[#252a34] border border-gray-700 rounded-sm flex items-center justify-center py-10 text-teal-500 hover:bg-[#2d333e] hover:border-teal-500 transition-all font-bold group"  >
                <span className="group-hover:scale-110 transition-transform">Agregar Contacto</span>
              </button>
            </div>
          )}
          {/* Solo se renderiza el que coincida con el estado */}
            {activeModal === "edit" && selectedContact && (
              <EditContactModal 
                isOpen={true} 
                contact={selectedContact} 
                onClose={() => {
                  setSelectedContact(null);
                  setActiveModal(null); // Cerramos el modal completamente
                }} 
              />
            )}

            {activeModal === "create" && (
              <CreateContactModal isOpen={true} onClose={closeModal} />
            )}

          {activeTab === "Ventas y compras" && (
          <div className="animate-fadeIn space-y-10 max-w-4xl">            
            {/* SECCIÓN VENTAS */}
            <section>
              <h3 className="text-white font-bold text-sm mb-4 tracking-wider">VENTAS</h3>
              <div className="flex items-start group">
                <span className="w-40 font-bold text-gray-300 shrink-0 flex items-center gap-1 pt-1">
                  Vendedor
                  <span className="text-teal-500" title="Responsable de ventas">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </span>
                </span>               
                {/* Input con Avatar */}
                <div className="flex-1 flex items-center gap-2 border-b border-transparent hover:border-gray-600 focus-within:border-teal-500 transition-colors pb-1">
                  <img 
                    src="https://via.placeholder.com/24" 
                    alt="Adrian Martin" 
                    className="w-6 h-6 rounded-md object-cover" />
                  <input 
                    type="text"
                    className="bg-transparent border-none outline-none w-full text-gray-300 placeholder-gray-500 focus:ring-0 text-base"
                    defaultValue="Adrian Martin Alcantara Cortez"
                    placeholder="Seleccionar vendedor..." />
                </div>
              </div>
            </section>
            {/* SECCIÓN COMPRA */}
            <section className="border-t border-gray-700 pt-6">
              <h3 className="text-white font-bold text-sm mb-4 tracking-wider">COMPRA</h3>
            </section>
            {/* SECCIÓN VARIOS */}
            <section className="border-t border-gray-700 pt-6 space-y-4">
              <h3 className="text-white font-bold text-sm mb-6 tracking-wider">VARIOS</h3>            
              {/* ID de la empresa */}
              <InputForm label="ID de la empresa" placeholder="Ej. ID-001" />
              {/* Referencia */}
              <InputForm label="Referencia" placeholder="68" />
              {/* Industria */}
              <InputForm label="Industria" placeholder="7310" />
            </section>
          </div>
          )}
        </div>
      </div>
    </div>
  );
}