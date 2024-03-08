import { ChangeEvent } from "react"

interface InputBoxProps {
    label: string,
    placeholder: string,
    type: string,
    onChange: (e: ChangeEvent<HTMLInputElement>) => void
}


const InputBox = ({label, placeholder, type, onChange}: InputBoxProps) => {
  return (
    <div className="px-2 py-1">
        <div>
            <label className="block mb-2 text-sm font-medium text-back-text-light dark:text-back-text-dark">{label}</label>
            <input onChange={onChange} type={type} id="first_name" className="bg-gray-50  text-back-text-light text-sm rounded-lg block w-full p-2.5 focus:outline-back-text-low-light dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-back-text-dark dark:focus:outline-none dark:focus:outline-back-text-low-dark" placeholder={placeholder} required />
        </div>
    </div>
  )
}

export default InputBox
