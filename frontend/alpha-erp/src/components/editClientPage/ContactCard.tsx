import { FC } from "react"

interface ContactCardProps {
  name: string;
  email?: string;
  position?: string;
  telefono?: string;
  color: string; 
}

export const ContactCard: FC<ContactCardProps> = ({ name, email, telefono, position, color }: ContactCardProps) => {
  return (
    <div className="flex bg-[#252a34] border border-gray-700 rounded-sm overflow-hidden min-h-[160px] hover:border-gray-500 transition-colors">
      {/* Letra inicial grande */}
      <div className={`${color} w-32 flex items-center justify-center shrink-0`}>
        <span className="text-6xl text-white font-light">
          {name.charAt(0)}
        </span>
      </div>

      {/* Información del contacto */}
      <div className="p-5 flex flex-col justify-center space-y-2 overflow-hidden">
        <h4 className="text-white font-bold text-lg leading-tight truncate" title={name}>
          {name}
        </h4>
        
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-gray-300">
            <span className="text-pink-600">✉</span>
            <span className="text-base truncate">{email}</span>
          </div>
          
          <div className="flex items-center gap-2 text-gray-300">
            <span className="text-pink-600">📞</span>
            <span className="text-base">{telefono}</span>
          </div>
          
          <div className="flex items-center gap-2 text-gray-400 mt-1">
            <span className="text-gray-500">💼</span>
            <span className="text-sm font-medium tracking-wide uppercase">{position}</span>
          </div>
        </div>
      </div>
    </div>
  );
};