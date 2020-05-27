import React from 'react';
import "../authentication/authentication.css"
import welcomeImage from "../../image/welcome.png";
import RedirectLogic from "../../logic/RedirectLogic";

class MainPageContainer extends React.PureComponent {
    handleBegin = () => {
        RedirectLogic.redirectToLogin();
    };

    render() {
        document.getElementById("root").style.padding = '0';
        return (
            <main className="login-main">
                <div className="container-fluid login-block">
                    <div className="row m-auto pt-3 pb-3">
                        <div className="col-lg-6 align-self-center pl-5 pr-5">
                            <div className="main-header">English2C</div>
                            <div className="main-subheader">Check and Control</div>
                            <div className="main-description">Контроль знаний - одна из важнейший составляющих учебного
                                процесса! Проходя задания студенты не только показывают свой уровень преподавателю, но и
                                самостоятельно оценивают свою подготовку и анализируют ошибки.
                            </div>
                            <button className="main-button" onClick={this.handleBegin}>Начать</button>
                        </div>
                        <div
                            className="col-lg-6 p-0 align-self-center text-center d-sm-none d-md-none d-none d-lg-block">
                            <img src={welcomeImage} className="auth-image"/>
                        </div>
                    </div>
                </div>
            </main>
        )
    }
}

export default MainPageContainer;