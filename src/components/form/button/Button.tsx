import React from 'react'

interface IButtonProps {
    Type: "button" | "submit" | "reset";
    class: string;
    buttonName: string;
    OnClick?:(e: any) => void;
}

const Button:React.FC<IButtonProps> = (props) => {
  return (
      <button type={props.Type} className={`w-100 ${props.class}`} onClick={props.OnClick}>{props.buttonName}</button>
  )
}

export default Button
