import React from "react";


type DarkModeButtonProps = {
    onClick: React.MouseEventHandler<HTMLElement>
}

const DarkModeButton = ({onClick}: DarkModeButtonProps) => {
    return (
        <div>
            <button onClick={onClick}>Click me</button>
        </div>
    )
}


export default DarkModeButton;