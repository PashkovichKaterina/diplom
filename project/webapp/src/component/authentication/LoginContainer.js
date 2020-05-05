import React from 'react';
import "./authentication.css"
import InputElement from "./InputElement";
import AuthenticationHeader from "./AuthenticationHeader";
import AuthenticationButton from "./AuthenticationButton";
import FormValidator from "../../service/FormValidator";
import im from "../../image/reg.png";
import i from "../../image/i.png";
import AuthenticationService from "../../service/AuthenticationService";
import AuthorizationLogic from "../../service/AuthorizationLogic";
import RedirectLogic from "../../service/RedirectLogic";
import Util from "../../service/Util";
import Message from "../../service/Message";

class LoginContainer extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            login: "",
            password: ""
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
                this.setState({isShowPopup: !response.ok});
                return response.json()
            })
            .then(json => {
                if (!this.state.isShowPopup) {
                    AuthorizationLogic.setAccessToken(json.accessToken);
                    AuthorizationLogic.setRefreshToken(json.refreshToken);
                } else {
                    this.setState({errorCode: json.errorCode});
                }
            })
            .then(() => {
                if (!this.state.isShowPopup) {
                    RedirectLogic.redirectToTopics();
                }
            });
    };

    render() {
        const {login, password} = this.state;
        document.getElementById("root").style.padding = '0';
        return (
            <main className="login-main">
                <div className="container-fluid login-block">
                    <div className="row m-auto">
                        <div className="col-lg-6 text-center">
                            <AuthenticationHeader active="login"/>
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
                                                      isSubmitEnable={FormValidator.isValidLoginForm(login, password)}/>
                            </form>
                        </div>
                        <div className="col-lg-6 p-0 align-self-center text-center">
                            <img src={i} className="auth-image"/>
                        </div>
                    </div>
                </div>
            </main>
        )
    }
}

export default LoginContainer;