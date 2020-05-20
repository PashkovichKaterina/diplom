import React from 'react';
import "./authentication.css"

const AuthenticationButton = (props) => {
    const {isSubmitEnable, errorMessage, submitButtonContent, cancelButtonContent, handleCancelClick} = props;
    const submitButton = isSubmitEnable
        ? <button className="auth-button" type="submit">{submitButtonContent}</button>
        : <button className="auth-button" type="submit" disabled>{submitButtonContent}</button>;
    const errorMessageElement = <div className="header-error-message">{errorMessage}</div>;
    return (
        <div className="auth-button-block">
            {errorMessageElement}
            <div className="row">
                <div className="col-lg-6">
                    {submitButton}
                </div>
                <div className="col-lg-6">
                    <button className="auth-button-cancel" type="button" onClick={handleCancelClick}>
                        {cancelButtonContent}
                    </button>
                </div>
            </div>
        </div>
    )
};

export default AuthenticationButton;