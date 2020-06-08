 import React from 'react';
import "./authentication.css"
import InputElement from "./InputElement";
import AuthenticationHeaderContainer from "./AuthenticationHeaderContainer";
import AuthenticationButton from "./AuthenticationButton";
import FormValidator from "../../logic/FormValidator";
import authImage from "../../image/auth.png";
import AuthenticationService from "../../service/AuthenticationService";
import AuthorizationLogic from "../../logic/AuthorizationLogic";
import RedirectLogic from "../../logic/RedirectLogic";
import Message from "../../logic/Message";

class LoginContainer extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            login: "",
            password: "",
            isSuccessLogin: true
        };
    }

    handleChange = (event) => {
        const {name, value} = event.target;
        this.setState({
            [name]: value
        });
    };

    handleSubmit = (event) => {
        event.preventDefault();
        const user = {
            login: this.state.login,
            password: this.state.password
        };
        AuthenticationService.login(user)
            .then(response => {
                this.setState({isSuccessLogin: response.ok});
                return response.json()
            })
            .then(json => {
                if (this.state.isSuccessLogin) {
                    AuthorizationLogic.setAccessToken(json.accessToken);
                    AuthorizationLogic.setRefreshToken(json.refreshToken);
                }
            })
            .then(() => {
                if (this.state.isSuccessLogin) {
                    RedirectLogic.redirectToTopics();
                }
            });
    };

    handleCancelClick = () => {
        RedirectLogic.redirectToMainPage();
    };

    render() {
        const {login, password, isSuccessLogin} = this.state;
        document.getElementById("root").style.padding = '0';
        return (
            <main className="login-main">
                <div className="container-fluid login-block">
                    <div className="row m-auto">
                        <div className="col-lg-6 text-center">
                            <AuthenticationHeaderContainer active="login"/>
                            <form className="align-self-center"
                                  onSubmit={this.handleSubmit}>
                                <InputElement type="text"
                                              name="login"
                                              value={login}
                                              isValid={true}
                                              onChange={this.handleChange}/>
                                <InputElement type="password"
                                              name="password"
                                              value={password}
                                              isValid={true}
                                              onChange={this.handleChange}/>
                                <AuthenticationButton type="login"
                                                      submitButtonContent="Вход"
                                                      cancelButtonContent="Отмена"
                                                      handleCancelClick={this.handleCancelClick}
                                                      isSubmitEnable={FormValidator.isValidLoginForm(login, password)}
                                                      errorMessage={!isSuccessLogin && Message.getString("authenticationException")}/>
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

export default LoginContainer;