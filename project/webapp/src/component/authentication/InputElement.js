import React from 'react';
import Message from "../../service/Message";

const InputElement = (props) => {
    const {name, type, isValid, value, onChange, onKeyDown} = props;
    const errorMessage = !isValid &&
        <div className="error-message">
            {Message.getString(name + "Error")}
        </div>;
    return (
        <div className="form-element text-center">
            <label className="form-label">{Message.getString(name)}</label>
            <input type={type}
                   name={name}
                   className={isValid ? "form-input" : "form-input-error"}
                   value={value}
                   onChange={onChange}
                   onKeyDown={onKeyDown}
                   placeholder={Message.getString(name + "Placeholder")}/>
            {errorMessage}
        </div>
    )
};

export default InputElement;