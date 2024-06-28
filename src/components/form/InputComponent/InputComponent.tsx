import React, {useState} from 'react'
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface IInputProps {
    name?: string;
    type: string;
    Label?: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeHolder: string;
    error?: string;
    maxLength?: number;
    onBlur?: () => void;
    class?: string;
  }
    
const InputComponent: React.FC<IInputProps> = (props) => {
    const [showPassword, setShowPassword] = useState(false);
    const inputType =
      props.type === "password"
        ? showPassword
          ? "text"
          : "password"
        : props.type;
    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
    };
    return (
      <div className={`mb-3 ${props.type === "password" ? "input-block" : ""}`}>
        <label className='fs-5'>{props.Label}</label>
        <input
          className={`form-control ${props.class} ${props.error ? "error-field" : ""}`}
          type={inputType}
          value={props.value}
          onChange={props.onChange}
          placeholder={props.placeHolder}
          onBlur={() => props.onBlur && props.onBlur()}
          maxLength={props.maxLength}
          name={props.name}
        />
        {props.error && <p className="error text-start">{props.error}</p>}
        {props.type === "password" && (
          <i className="eye-icon" onClick={togglePasswordVisibility}>
            <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
          </i>
        )}
      </div>
    );
  };
  export default InputComponent;
  
  
  
  
  
  
