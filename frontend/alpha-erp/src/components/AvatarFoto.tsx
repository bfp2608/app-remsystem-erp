import { useState } from "react";

export function AvatarFoto() {
    
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
    );
}