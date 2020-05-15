import React from 'react';
import "./authentication.css"
import InputElement from "./InputElement";
import AuthenticationHeaderContainer from "./AuthenticationHeaderContainer";
import AuthenticationButtonContainer from "./AuthenticationButtonContainer";
import FormValidator from "../../service/FormValidator";
import authImage from "../../image/auth.png";
import AuthenticationService from "../../service/AuthenticationService";
import AuthorizationLogic from "../../service/AuthorizationLogic";
import RedirectLogic from "../../service/RedirectLogic";

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
                                <AuthenticationButtonContainer type="login"
                                                               isSubmitEnable={FormValidator.isValidLoginForm(login, password)}/>
                            </form>
                        </div>
                        <div className="col-lg-6 p-0 align-self-center text-center">
                            <img src={authImage} className="auth-image"/>
                        </div>
                    </div>
                </div>
            </main>
        )
    }
}

export default LoginContainer;