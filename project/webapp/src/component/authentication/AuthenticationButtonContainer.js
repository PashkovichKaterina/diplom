import React from 'react';
import "./authentication.css"
import RedirectLogic from "../../service/RedirectLogic";

class AuthenticationButtonContainer extends React.PureComponent {
    handleCancel = () => {
        RedirectLogic.redirectToMainPage();
    };

    render() {
        const {type, isSubmitEnable, errorMessage} = this.props;
        const submitButton = isSubmitEnable
            ? <button className="auth-button">{type === "login" ? "Вход" : "Регистрация"}</button>
            : <button className="auth-button" disabled>{type === "login" ? "Вход" : "Регистрация"}</button>;
        const errorMessageElement = <div className="header-error-message">{errorMessage}</div>;
        return (
            <div className="auth-button-block">
                {errorMessageElement}
                <div className="row">
                    <div className="col-lg-6">
                        {submitButton}
                    </div>
                    <div className="col-lg-6">
                        <button className="auth-button-cancel" onClick={this.handleCancel}>Отмена</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default AuthenticationButtonContainer;