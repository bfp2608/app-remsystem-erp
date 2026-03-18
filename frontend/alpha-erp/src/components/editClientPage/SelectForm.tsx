import { FC, ChangeEvent } from "react";

interface SelectFormProps {
  label: string;
  options?: string[] | { value: string; label: string }[];
  value?: string;
  name?: string;
  onChange?: (e: ChangeEvent<HTMLSelectElement>) => void;
}

export const SelectForm: FC<SelectFormProps> = ({ 
    label, 
    options = [], 
    value, 
    onChange, 
    name 
  }) => {
  return (
     <div className="w-full lg:w-[calc(50%-0.5rem)] relative border-b border-transparent hover:border-gray-600 focus-within:border-teal-500 transition-colors pt-1">
      <select
        name={name}
        value={value}
        onChange={onChange}
        className="bg-transparent border-none outline-none w-full focus:ring-0 text-base cursor-pointer text-white"
      >
        {/* Opción por defecto / Placeholder */}
        <option value="" className="bg-[#2d333e] text-gray-300">
          {label}
        </option>

        {/* Mapeo de opciones flexible (acepta strings o objetos) */}
        {options.map((opt, index) => {
          const isObject = typeof opt === 'object';
          const val = isObject ? opt.value : opt;
          const lbl = isObject ? opt.label : opt;
          
          return (
            <option key={index} value={val} className="bg-[#2d333e] text-gray-300">
              {lbl}
            </option>
          );
        })}
      </select>
    </div>
  );
};