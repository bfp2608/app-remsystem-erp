import { useEffect, useRef, useState } from "react";

export function EditarClientesPage() {
  const [previewSrc, setPreviewSrc] = useState<string | null>(null);
  const [countryInput, setCountryInput] = useState("");
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const [tagInput, setTagInput] = useState("");
  const [showTagDropdown, setShowTagDropdown] = useState(false);
  const [tags, setTags] = useState<string[]>(["8510 / ENSEÑANZA PREESCOLAR..."]);

  const countryRef = useRef<HTMLDivElement>(null);
  const tagsRef = useRef<HTMLDivElement>(null);

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

  const handleFotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      setPreviewSrc(ev.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const selectCountry = (name: string) => {
    setCountryInput(name);
    setShowCountryDropdown(false);
  };

  const addTag = (text: string) => {
    setTags((prev) => [...prev, text]);
    setTagInput("");
    setShowTagDropdown(false);
  };

  const removeTag = (index: number) => {
    setTags((prev) => prev.filter((_, i) => i !== index));
  };

  const countries = ["Afganistán", "Albania", "Alemania", "Andorra", "Angola"];
  const filteredCountries = countries.filter((c) =>
    c.toLowerCase().includes(countryInput.toLowerCase())
  );

  const availableTags = ["0111", "0112", "0113"];

  return (
    <div className="bg-[#1e2129] text-gray-200 font-sans min-h-screen">
      <div className="w-full bg-[#242933] p-8 min-h-screen text-gray-300 font-sans">

        {/* Cabecera: foto + nombre + contacto */}
        <div className="flex flex-col md:flex-row gap-8 mb-10">

          {/* Avatar / foto */}
          <div className="relative w-28 h-28 shrink-0 group">
            <input
              type="file"
              id="foto-input"
              className="hidden"
              accept="image/*"
              onChange={handleFotoChange}
            />
            <label
              htmlFor="foto-input"
              className="w-full h-full bg-[#3b6bb0] flex items-center justify-center text-white rounded-sm cursor-pointer transition-all duration-300 overflow-hidden relative border border-transparent hover:border-teal-500"
            >
              {!previewSrc && (
                <span className="text-6xl font-bold group-hover:opacity-20 transition-opacity">
                  1
                </span>
              )}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-[#3b6bb0]/40 transition-opacity p-2 text-center">
                <span className="text-xs font-medium leading-tight">
                  Agregar una fotografía
                </span>
              </div>
              {previewSrc && (
                <img
                  src={previewSrc}
                  className="absolute inset-0 w-full h-full object-cover"
                  alt="preview"
                />
              )}
            </label>
          </div>

          {/* Nombre y campos de contacto */}
          <div className="flex-1">
            <div className="flex items-center gap-4 mb-2 text-sm">
              <label className="flex items-center gap-1 cursor-pointer">
                <input type="radio" name="tipo" className="accent-teal-500" /> Persona
              </label>
              <label className="flex items-center gap-1 cursor-pointer">
                <input type="radio" name="tipo" defaultChecked className="accent-teal-500" />
                <span className="text-teal-400 font-medium">Empresa</span>
              </label>
            </div>

            <div className="flex items-center border-b border-transparent hover:border-gray-600 focus-within:border-teal-500 transition-colors mb-4 w-full lg:w-2/3">
              <input
                type="text"
                className="text-3xl bg-transparent border-none outline-none w-full text-white focus:ring-0 font-semibold py-1"
                placeholder="Nombre de la empresa"
              />
            </div>

            <div className="space-y-2">
              {/* Email */}
              <div className="flex items-center gap-3 border-b border-transparent hover:border-gray-600 focus-within:border-teal-500 transition-colors w-full lg:w-1/2">
                <span className="text-pink-700">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </span>
                <input
                  type="email"
                  className="bg-transparent border-none outline-none w-full text-gray-300 placeholder-gray-500 focus:ring-0 text-base py-1"
                  placeholder="Correo electrónico"
                />
              </div>

              {/* Teléfono */}
              <div className="flex items-center gap-3 border-b border-transparent hover:border-gray-600 focus-within:border-teal-500 transition-colors w-full lg:w-1/2">
                <span className="text-pink-700">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </span>
                <input
                  type="tel"
                  className="bg-transparent border-none outline-none w-full text-gray-300 placeholder-gray-500 focus:ring-0 text-base py-1"
                  placeholder="Teléfono"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Grid de campos */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-20 gap-y-6 mt-10 text-sm">

          {/* Columna izquierda: Dirección */}
          <div className="space-y-1 mb-4">
            <div className="flex items-start">
              <span className="w-32 font-bold text-gray-300 shrink-0 pt-1">Dirección</span>
              <div className="flex flex-col flex-1 gap-0">

                <div className="border-b border-transparent hover:border-gray-600 focus-within:border-teal-500 transition-colors">
                  <input
                    className="bg-transparent border-none outline-none w-full text-gray-300 placeholder-gray-500 focus:ring-0 text-base py-1"
                    placeholder="Nro. Sn a.H. San Martin (Iii Etapa - Cerca a la Municipalidad) Piura Piura"
                  />
                </div>

                <div className="border-b border-transparent hover:border-gray-600 focus-within:border-teal-500 transition-colors">
                  <input
                    className="bg-transparent border-none outline-none w-full text-gray-300 placeholder-gray-500 focus:ring-0 text-base italic py-1"
                    placeholder="Calle 2..."
                  />
                </div>

                <div className="flex gap-4">
                  <div className="w-1/3 border-b border-transparent hover:border-gray-600 focus-within:border-teal-500 transition-colors">
                    <input
                      className="bg-transparent border-none outline-none w-full text-gray-300 placeholder-gray-500 focus:ring-0 text-base py-1"
                      placeholder="Piura"
                    />
                  </div>
                  <div className="w-1/3 relative border-b border-transparent hover:border-gray-600 focus-within:border-teal-500 transition-colors">
                    <select className="bg-transparent border-none outline-none w-full font-medium focus:ring-0 text-base appearance-none cursor-pointer py-1">
                      <option className="bg-[#2d333e] text-gray-300">Piura (PE)</option>
                      <option className="bg-[#2d333e] text-gray-300">Amazonas (PE)</option>
                      <option className="bg-[#2d333e] text-gray-300">Ancash (PE)</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none text-[10px]">▼</div>
                  </div>
                  <div className="w-1/3 border-b border-transparent hover:border-gray-600 focus-within:border-teal-500 transition-colors">
                    <input
                      className="bg-transparent border-none outline-none w-full text-gray-300 placeholder-gray-500 focus:ring-0 text-base py-1"
                      placeholder="Piura"
                    />
                  </div>
                </div>

                {/* País con dropdown */}
                <div className="relative border-b border-transparent hover:border-gray-600 focus-within:border-teal-500 transition-colors" ref={countryRef}>
                  <div className="flex items-center">
                    <input
                      type="text"
                      className="bg-transparent border-none outline-none w-full text-gray-300 placeholder-gray-500 focus:ring-0 text-base py-1 cursor-pointer"
                      placeholder="Perú"
                      autoComplete="off"
                      value={countryInput}
                      onChange={(e) => setCountryInput(e.target.value)}
                      onFocus={() => setShowCountryDropdown(true)}
                    />
                    <div className="text-[10px] pr-2">▼</div>
                  </div>
                  {showCountryDropdown && (
                    <div className="absolute left-0 top-full w-full bg-[#2d333e] border border-gray-700 shadow-2xl z-50 rounded-sm mt-0.5 max-h-60 overflow-y-auto">
                      {filteredCountries.map((country) => (
                        <div
                          key={country}
                          className="hover:bg-[#363d4a] p-2 text-sm text-gray-300 cursor-pointer border-b border-gray-700/50"
                          onClick={() => selectCountry(country)}
                        >
                          {country}
                        </div>
                      ))}
                      <div className="p-2 text-sm text-teal-400 cursor-pointer font-medium hover:bg-[#363d4a] sticky bottom-0 bg-[#2d333e]">
                        Buscar más...
                      </div>
                    </div>
                  )}
                </div>

              </div>
            </div>
          </div>

          {/* Columna derecha: RUC, Sitio web, Etiquetas */}
          <div className="space-y-4 mb-4">

            <div className="flex items-center border-b border-transparent hover:border-gray-600 focus-within:border-teal-500 transition-colors pb-1">
              <span className="w-32 font-bold text-gray-300 flex items-center gap-1 shrink-0">
                RUC <span className="text-xs text-blue-400 cursor-help">?</span>
              </span>
              <input
                className="bg-transparent border-none outline-none w-full text-gray-300 placeholder-gray-500 focus:ring-0 text-base"
                placeholder="20614090465"
              />
            </div>

            <div className="flex items-center border-b border-transparent hover:border-gray-600 focus-within:border-teal-500 transition-colors pb-1">
              <span className="w-32 font-bold text-gray-300 shrink-0">Sitio web</span>
              <input
                className="bg-transparent border-none outline-none w-full text-gray-300 placeholder-gray-500 italic focus:ring-0 text-base"
                placeholder="Por ejemplo, https://www.odoo.com"
              />
            </div>

            {/* Etiquetas */}
            <div className="flex items-center pb-1">
              <span className="w-32 font-bold text-gray-300 shrink-0">Etiquetas</span>
              <div className="flex-1 relative" ref={tagsRef}>
                <div
                  className="flex flex-wrap gap-2 items-center border-b border-gray-600 hover:border-teal-500 focus-within:border-teal-500 min-h-[32px] pb-1 transition-colors cursor-text"
                  onClick={() => setShowTagDropdown(true)}
                >
                  {tags.map((tag, i) => (
                    <div
                      key={i}
                      className="bg-[#1f4b4e] text-teal-300 px-3 py-0.5 rounded-full text-xs flex items-center gap-2 border border-teal-800"
                    >
                      {tag}
                      <button
                        className="hover:text-white font-bold"
                        onClick={(e) => { e.stopPropagation(); removeTag(i); }}
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                  <input
                    type="text"
                    className="bg-transparent border-none outline-none text-gray-300 flex-1 min-w-[60px] focus:ring-0 text-sm"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onFocus={() => setShowTagDropdown(true)}
                  />
                </div>
                {showTagDropdown && (
                  <div className="absolute left-0 top-full mt-1 w-full bg-[#2d333e] border border-gray-700 shadow-2xl z-50 rounded-sm overflow-hidden">
                    {availableTags.map((tag) => (
                      <div
                        key={tag}
                        className="hover:bg-[#363d4a] p-2 text-sm text-gray-300 cursor-pointer border-b border-gray-700"
                        onClick={() => addTag(tag)}
                      >
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

          </div>
        </div>

        {/* Tabs */}
        <div className="flex bg-[#2d333e] border-y border-gray-700 overflow-x-auto">
          <button className="px-10 py-4 text-sm font-bold border-b-2 border-pink-500 text-pink-500 bg-[#252a34]">
            Contactos
          </button>
          <button className="px-10 py-4 text-sm font-medium text-gray-400 hover:bg-[#363d4a] hover:text-white transition-colors">
            Ventas y compras
          </button>
          <button className="px-10 py-4 text-sm font-medium text-gray-400 hover:bg-[#363d4a] hover:text-white transition-colors whitespace-nowrap">
            Asignación de socio
          </button>
          <button className="px-10 py-4 text-sm font-medium text-gray-400 hover:bg-[#363d4a] hover:text-white transition-colors">
            Notas
          </button>
        </div>

        {/* Tarjetas de contacto */}
        <div className="p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <div className="bg-[#2d333e] flex rounded-sm border border-gray-700 hover:border-teal-500 transition-all cursor-pointer shadow-md">
            <div className="w-24 h-24 bg-[#5c4a9c] flex items-center justify-center text-white text-4xl font-bold shrink-0">
              N
            </div>
            <div className="p-4 flex flex-col justify-center">
              <h3 className="font-bold text-white text-sm uppercase">NORMA RUIZ CARREÑO</h3>
              <div className="flex items-center gap-2 text-xs text-gray-400 mt-2">
                <span className="text-teal-500">💼</span>
                DIRECTOR
              </div>
            </div>
          </div>

          <button className="border-2 border-dashed border-gray-700 rounded-sm flex items-center justify-center py-10 text-teal-400 hover:bg-[#2d333e] hover:border-teal-500 transition-all font-bold">
            + Agregar Contacto
          </button>
        </div>

      </div>
    </div>
  );
}