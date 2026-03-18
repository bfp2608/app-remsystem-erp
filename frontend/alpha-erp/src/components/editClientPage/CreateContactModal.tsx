import { FC } from "react"

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CreateContactModal: FC<ModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-[#2d333e] w-full max-w-lg rounded-sm shadow-2xl border border-gray-700 overflow-hidden">
        {/* Cabecera */}
        <div className="flex justify-between items-center p-4 border-b border-gray-700">
          <h2 className="text-white font-bold text-lg">Crear Contacto</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white text-xl">✕</button>
        </div>

        {/* Cuerpo del Modal */}
        <div className="p-6 space-y-6">
          <div className="flex gap-4 text-xs font-medium text-gray-300">
            {["Contacto", "Factura", "Entrega", "Otro"].map((type, i) => (
              <label key={type} className="flex items-center gap-2 cursor-pointer">
                <input type="radio" name="modalType" defaultChecked={i===0} className="accent-teal-500" />
                {type}
              </label>
            ))}
          </div>

          <div className="flex gap-4">
            <div className="w-24 h-24 bg-gray-700 rounded-sm flex items-center justify-center shrink-0 border border-gray-600">
               {/* Icono de usuario */}
               <svg className="w-16 h-16 text-gray-500" fill="currentColor" viewBox="0 0 24 24">
                 <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
               </svg>
            </div>
        
            <div className="flex-1 space-y-3">
              <input type="text" placeholder="Por ejemplo, Francisco Pérez" className="w-full bg-transparent border-b border-gray-600 py-1 text-gray-200 outline-none focus:border-teal-500 transition-colors" />
              <div className="flex items-center gap-2 border-b border-gray-600 py-1 focus-within:border-teal-500">
                <span className="text-pink-600 text-sm">✉</span>
                <input type="email" placeholder="Correo electrónico" className="w-full bg-transparent outline-none text-sm text-gray-300" />
              </div>
              <div className="flex items-center gap-2 border-b border-gray-600 py-1 focus-within:border-teal-500">
                <span className="text-pink-600 text-sm">📞</span>
                <input type="tel" placeholder="Teléfono" className="w-full bg-transparent outline-none text-sm text-gray-300" />
              </div>
              <div className="flex items-center gap-2 border-b border-gray-600 py-1 focus-within:border-teal-500">
                <span className="text-pink-600 text-sm">💼</span>
                <input type="text" placeholder="Puesto" className="w-full bg-transparent outline-none text-sm text-gray-300" />
              </div>
            </div>
          </div>
        </div>
        {/* Acciones */}
        <div className="p-4 bg-[#252a34] flex gap-2">
          <button className="bg-pink-700 hover:bg-pink-600 text-white px-4 py-2 rounded-sm text-sm font-bold transition-colors">Guardar y cerrar</button>
          <button className="border border-pink-700 text-pink-500 hover:bg-pink-900/20 px-4 py-2 rounded-sm text-sm font-bold transition-colors">Guardar y crear nuevo</button>
          <button onClick={onClose} className="text-gray-400 hover:text-white px-4 py-2 text-sm">Descartar</button>
        </div>
      </div>
    </div>
  );
}