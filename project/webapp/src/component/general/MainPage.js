import React from 'react';
import "../authentication/authentication.css"
import i from "../../image/i.png";
import RedirectLogic from "../../service/RedirectLogic";

class MainPage extends React.PureComponent {
    handleBegin = () => {
        RedirectLogic.redirectToLogin();
    };

    render() {
        document.getElementById("root").style.padding = '0';
        return (
            <main className="login-main">
                <div className="container-fluid login-block">
                    <div className="row m-auto">
                        <div className="col-lg-6 align-self-center pl-5 pr-5">
                            <div className="main-header">English2C</div>
                            <div className="main-subheader">Check and Control</div>
                            <div className="main-description">Данный сайт предназначен для контроля знаний у студентов.
                                Он также помогает успешно сдать экзамены!
                            </div>
                            <button className="main-button" onClick={this.handleBegin}>Начать</button>
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

export default MainPage;