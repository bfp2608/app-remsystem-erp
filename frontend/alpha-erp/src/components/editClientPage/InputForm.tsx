import { FC } from "react"

interface InputFormProps {
    label: string
    placeholder: string 
}

export const InputForm: FC <InputFormProps> = ({ label, placeholder }) => {

    return (
        <div className="flex items-start">
              <span className="w-34 font-bold text-gray-300 shrink-0 pt-1">{ label }</span>
                <div className="flex flex-col flex-1 gap-0">
                  <div className="border-b border-transparent hover:border-gray-600 focus-within:border-teal-500 transition-colors">
                    <input
                      className="bg-transparent border-none outline-none w-full text-gray-300 placeholder-gray-500 focus:ring-0 text-base py-1"
                      placeholder={ placeholder }
                    />
                  </div>
                </div>
        </div>
    )
}