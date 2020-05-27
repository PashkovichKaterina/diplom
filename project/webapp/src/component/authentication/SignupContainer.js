import React from 'react';
import "./authentication.css"
import authImage from "../../image/auth.png"
import InputElement from "./InputElement";
import AuthenticationButton from "./AuthenticationButton";
import Util from "../../logic/Util";
import Message from "../../logic/Message";
import FormValidator from "../../logic/FormValidator";
import RedirectLogic from "../../logic/RedirectLogic";
import AuthorizationLogic from "../../logic/AuthorizationLogic";
import AuthenticationService from "../../service/AuthenticationService";
import AuthenticationHeaderContainer from "./AuthenticationHeaderContainer";

class SignupContainer extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            login: "",
            email: "",
            password: "",
            confirmPassword: "",
            isValidLogin: true,
            isValidEmail: true,
            isValidPassword: true,
            isValidConfirmPassword: true
        };
    }

    handleKeyDown = (event) => {
        if (event.keyCode === 13 && !FormValidator.isValidSignupForm(this.state.login, this.state.email, this.state.password, this.state.confirmPassword)) {
            event.preventDefault();
        }
    };

    handleSubmitSignupForm = (event) => {
        event.preventDefault();
        const user = {
            login: this.state.login,
            email: this.state.email,
            password: this.state.password
        };
        let isSuccessSignup;
        AuthenticationService.signup(user)
            .then(response => {
                isSuccessSignup = response.ok;
                return response.json();
            })
            .then((json) => {
                if (isSuccessSignup) {
                    AuthenticationService.login(user)
                        .then(response => response.json())
                        .then(json => {
                            AuthorizationLogic.setAccessToken(json.accessToken);
                            AuthorizationLogic.setRefreshToken(json.refreshToken);
                            RedirectLogic.redirectToEditStudentForm();
                        })
                } else {
                    this.setState({errorCode: json.errorCode});
                }
            });
    };

    handleChange = (event) => {
        const {name, value} = event.target;
        this.setState({
            [name]: value
        });
        this.checkInputField(name, value);
    };

    checkInputField(name, value) {
        const {password, confirmPassword} = this.state;
        let field = `isValid${Util.capitalize(name)}`;
        let isValidField = false;
        switch (name) {
            case "login":
                isValidField = FormValidator.isValidLogin(value);
                break;
            case "email":
                isValidField = FormValidator.isValidEmail(value);
                break;
            case "password":
                isValidField = FormValidator.isValidPassword(value);
                if (confirmPassword) {
                    this.setState({
                        isValidConfirmPassword: FormValidator.isValidConfirmPassword(value, confirmPassword)
                    });
                }
                break;
            case "confirmPassword":
                isValidField = FormValidator.isValidConfirmPassword(password, value);
        }
        this.setState({[field]: isValidField});
    }

    handleCancelClick = () => {
        RedirectLogic.redirectToMainPage();
    };

    render() {
        const {
            login, email, password, confirmPassword, isValidLogin, isValidEmail, isValidPassword,
            isValidConfirmPassword, errorCode
        } = this.state;
        document.getElementById("root").style.padding = '0';
        return (
            <main className="login-main">
                <div className="container-fluid login-block">
                    <div className="row m-auto">
                        <div className="col-lg-6 text-center">
                            <AuthenticationHeaderContainer active="signup"/>
                            <form className="align-self-center"
                                  onSubmit={this.handleSubmitSignupForm}
                                  onKeyDown={this.handleKeyDown}>
                                <InputElement type="text"
                                              name="login"
                                              value={login}
                                              isValid={isValidLogin}
                                              onChange={this.handleChange}/>
                                <InputElement type="email"
                                              name="email"
                                              value={email}
                                              isValid={isValidEmail}
                                              onChange={this.handleChange}/>
                                <InputElement type="password"
                                              name="password"
                                              value={password}
                                              isValid={isValidPassword}
                                              onChange={this.handleChange}/>
                                <InputElement type="password"
                                              name="confirmPassword"
                                              value={confirmPassword}
                                              isValid={isValidConfirmPassword}
                                              onChange={this.handleChange}/>
                                <AuthenticationButton type="signup"
                                                      submitButtonContent="Регистрация"
                                                      cancelButtonContent="Отмена"
                                                      handleCancelClick={this.handleCancelClick}
                                                      isSubmitEnable={FormValidator.isValidSignupForm(login, email, password, confirmPassword)}
                                                      errorMessage={Message.getString(errorCode)}/>
                            </form>
                        </div>
                        <div className="col-lg-6 p-0 align-self-center text-center d-sm-none d-md-none d-none d-lg-block">
                            <img src={authImage} className="auth-image"/>
                        </div>
                    </div>
                </div>
            </main>
        )
    }
}

export default SignupContainer;