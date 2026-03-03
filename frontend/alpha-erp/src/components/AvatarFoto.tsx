import { useState } from "react";

// Definimos la interfaz para las props
interface AvatarFotoProps {
  tipo: "persona" | "empresa";
}

export function AvatarFoto({ tipo }: AvatarFotoProps) {
  const [previewSrc, setPreviewSrc] = useState<string | null>(null);

  const handleFotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      setPreviewSrc(ev.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  return (
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
        {/* Lógica de iconos cuando NO hay imagen */}
        {!previewSrc && (
          <div className="transition-opacity group-hover:opacity-20">
            {tipo === "persona" ? (
              // Icono de Usuario (Persona)
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            ) : (
              // Icono de Edificio (Empresa)
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            )}
          </div>
        )}

        {/* Overlay de texto al hacer hover */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-[#3b6bb0]/60 transition-opacity p-2 text-center">
          <span className="text-xs font-bold leading-tight">
            {previewSrc ? "Cambiar foto" : "Agregar una fotografía"}
          </span>
        </div>

        {/* Imagen cargada */}
        {previewSrc && (
          <img
            src={previewSrc}
            className="absolute inset-0 w-full h-full object-cover"
            alt="preview"
          />
        )}
      </label>
    </div>
  );
}