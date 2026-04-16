
type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  titulo: string;
  mensaje: React.ReactNode; 
  textoConfirmar?: string;
  variante?: 'danger' | 'primary'; // Para cambiar el color del botón
}

export const ModalConfirmacion = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  titulo, 
  mensaje, 
  textoConfirmar = "Confirmar", 
  variante = 'danger' 
}: ModalProps) => {
  
  if (!isOpen) return null;

  const btnColor = variante === 'danger' 
    ? "bg-red-600 hover:bg-red-700" 
    : "bg-teal-600 hover:bg-teal-700"; 

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 shadow-2xl max-w-sm w-full mx-4">
        <h3 className="text-xl font-bold text-white mb-2">{titulo}</h3>
        <div className="text-gray-400 mb-6">{mensaje}</div>
        
        <div className="flex justify-end gap-3">
          <button onClick={onClose} className="px-4 py-2 text-gray-400 hover:text-white transition-colors">
            Cancelar
          </button>
          <button 
            onClick={onConfirm}
            className={`px-4 py-2 ${btnColor} text-white rounded-lg transition-colors font-medium`}
          >
            {textoConfirmar}
          </button>
        </div>
      </div>
    </div>
  );
};