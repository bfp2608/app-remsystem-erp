import { FC } from "react"

interface SelectFormProp {
    data: string[]
}

export const SelectForm: FC<SelectFormProp> = ({data}) => {
    return (
        <div className="w-1/4 relative border-b border-transparent hover:border-gray-600 focus-within:border-teal-500 transition-colors pt-1">
                    <select className="bg-transparent border-none outline-none w-full focus:ring-0 text-base cursor-pointer py-1">
                      {data.map((nombre,index) => (
                        <option key={index} className="bg-[#2d333e] text-gray-300">{nombre}</option>
                      ))}
                    </select>
        </div>
    )
}