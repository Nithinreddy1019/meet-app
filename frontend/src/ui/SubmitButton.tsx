import { MouseEventHandler } from "react"

interface SubmitButtonProps {
    label: string,
    onClick: MouseEventHandler<HTMLButtonElement>
}


const SubmitButton = ({label, onClick}: SubmitButtonProps) => {
  return (
    <div className="w-full px-3">
      <button className="bg-gray-800 text-white px-2 py-2 w-full rounded-full hover:bg-textlightb" onClick={onClick}>
        {label}
      </button>
    </div>
  )
}

export default SubmitButton
