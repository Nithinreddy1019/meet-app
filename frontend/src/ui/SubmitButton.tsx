
interface SubmitButtonProps {
    label: string
}


const SubmitButton = ({label}: SubmitButtonProps) => {
  return (
    <div className="w-full px-3">
      <button className="bg-gray-800 text-white px-2 py-2 w-full rounded-full hover:bg-textlightb">
        {label}
      </button>
    </div>
  )
}

export default SubmitButton
