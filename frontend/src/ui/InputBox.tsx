import { ChangeEventHandler } from "react"

interface InputBoxProps{
    label: string,
    inputtype: string,
    onChange: ChangeEventHandler<HTMLInputElement>
}

const InputBox = ({label, inputtype, onChange} : InputBoxProps) => {
  return (
    <div className="flex flex-col w-full px-2 py-3 text-textlightb">
      
      <input className="border rounded-xl h-10 px-2 focus:outline-purple-200 pl-8 bg-gray-100" placeholder={label} onChange={onChange}/>

        <div className="absolute text-textlighta">
            {inputtype === 'email' ? <i className="fi fi-rr-envelope absolute top-2.5 left-2.5"></i> : '' }

            {inputtype === 'username'? <i className="fi fi-rr-user absolute top-2.5 left-2"></i> : ''}
        </div>

    </div>
  )
}

export default InputBox
