import { FC } from "react";

export interface Contact {
  name: string;
  email: string;
  telefono: string;
  position: string;
  color?: string;
}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  contact: Contact | null;
}

export const EditContactModal: FC<ModalProps> = ({ isOpen, onClose, contact }) => {
  if (!isOpen || !contact) return null;

  const initial = contact.name ? contact.name.charAt(0).toUpperCase() : "?";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="bg-[#252a34] w-full max-w-2xl rounded-sm shadow-2xl border border-gray-700 overflow-hidden text-gray-300">
        {/* Cabecera */}
        <div className="flex justify-between items-center px-4 py-2 border-b border-gray-700 bg-[#2d333e]">
          <h2 className="text-white font-semibold text-sm">Contacto</h2>
          <div className="flex gap-4 items-center">
             <button onClick={onClose} className="text-gray-400 hover:text-white text-xl">✕</button>
          </div>
        </div>

        <div className="p-6 space-y-6">

          <div className="flex gap-5">
            {/* Avatar */}
            <div className={`w-24 h-24 ${contact.color || 'bg-teal-600'} rounded-sm flex items-center justify-center shrink-0 shadow-lg`}>
               <span className="text-white text-5xl font-light">{initial}</span>
            </div>
        
            <div className="flex-1 space-y-4">
              {/* Nombre con línea de color Odoo */}
              <input 
                type="text" 
                defaultValue={contact.name} 
                className="w-full bg-transparent border-b border-teal-500 pb-1 text-2xl text-white outline-none focus:border-teal-400 transition-colors" 
              />
              
              <div className="grid grid-cols-1 gap-3">
                <div className="flex items-center gap-3">
                  <span className="text-pink-500 w-5">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                  </span>
                  <input type="email" defaultValue={contact.email} className="w-full bg-transparent border-b border-gray-700 outline-none focus:border-teal-500 transition-colors text-blue-400" />
                </div>
                
                <div className="flex items-center gap-3">
                  <span className="text-pink-500 w-5">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                  </span>
                  <input type="tel" defaultValue={contact.telefono} className="w-full bg-transparent border-b border-gray-700 outline-none focus:border-teal-500 transition-colors" />
                </div>
                
                <div className="flex items-center gap-3">
                  <span className="text-pink-500 w-5">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
                  </span>
                  <input type="text" defaultValue={contact.position} className="w-full bg-transparent border-b border-gray-700 outline-none focus:border-teal-500 transition-colors" />
                </div>
              </div>
            </div>
          </div>

          {/* Notas */}
          <div className="flex gap-3 items-start">
            <span className="text-gray-400 font-bold text-sm shrink-0 w-12 pt-1">Notas</span>
            <textarea 
              className="flex-1 bg-transparent border-b border-gray-700 outline-none focus:border-teal-500 transition-colors py-1 text-sm resize-none"
              placeholder="Notas internas..."
              rows={1}
            ></textarea>
          </div>
        </div>

        {/* Footer con Botones */}
        <div className="p-4 bg-[#2d333e] border-t border-gray-700 flex justify-between items-center">
          <div className="flex gap-2">
            <button 
              onClick={onClose}
              className="bg-[#7c4d6a] hover:bg-[#8e5a7a] text-white px-4 py-1.5 rounded-sm text-sm font-medium shadow-md transition-colors"
            >
              Guardar
            </button>
            <button 
              onClick={onClose}
              className="bg-[#363d4a] hover:bg-[#454d5c] text-white px-4 py-1.5 rounded-sm text-sm font-medium border border-gray-600 transition-colors"
            >
              Descartar
            </button>
          </div>
          
          <button className="flex items-center gap-2 bg-[#363d4a] hover:bg-red-900/40 text-gray-400 hover:text-red-400 px-3 py-1.5 rounded-sm text-xs font-bold transition-all border border-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
};