import React from 'react';
import "./authentication.css"
import RedirectLogic from "../../logic/RedirectLogic";

class AuthenticationHeaderContainer extends React.PureComponent {
    handleLoginRedirect = () => {
        if (this.props.active !== "login") {
            RedirectLogic.redirectToLogin();
        }
    };

    handleSignupRedirect = () => {
        if (this.props.active !== "signup") {
            RedirectLogic.redirectToSignup();
        }
    };

    render() {
        const {active} = this.props;
        const loginElement = <div className={`col-6 auth-header${active === "login" ? "-active" : ""}`}
                                  onClick={this.handleLoginRedirect}>
            ВХОД
        </div>;
        const signupElement = <div className={`col-6 auth-header${active === "signup" ? "-active" : ""}`}
                                   onClick={this.handleSignupRedirect}>
            РЕГИСТРАЦИЯ
        </div>;
        return (
            <div className="row auth-header-block">
                {loginElement}
                {signupElement}
            </div>
        )
    }
}

export default AuthenticationHeaderContainer;