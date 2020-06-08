import React from 'react';
import {faUser} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import AuthorizationLogic from "../../logic/AuthorizationLogic";
import RedirectLogic from "../../logic/RedirectLogic";

class HeaderContainer extends React.PureComponent {
    handleLogout = () => {
        AuthorizationLogic.deleteTokens();
        RedirectLogic.redirectToLogin();
    };

    handleMainPage = () => {
        RedirectLogic.redirectToMainPage();
    };

    handleProfileRedirect = () => {
        RedirectLogic.redirectToUserProfile();
    };

    render() {
        const {isMain} = this.props;
        const topicElement = AuthorizationLogic.isStudentLogin()
            && <li><a href="/topics">Темы</a></li>;
        const profileElement = AuthorizationLogic.isStudentLogin() &&
            <a className="dropdown-item"
               onClick={this.handleProfileRedirect}>
                Личный кабинет
            </a>;
        return (
            <header
                className={isMain ? "container-fluid d-table text-right main"
                    : "container-fluid d-table text-right ba"}>
                <div className="d-inline float-left site-title"
                     onClick={this.handleMainPage}>
                    English2C
                </div>
                <ul className="right-nav d-inline">
                    {topicElement}
                    <li>
                        <div className="dropdown">
                            <button className="dropdown-toggle"
                                    id="dropdownMenuButton"
                                    data-toggle="dropdown"
                                    aria-haspopup="true"
                                    aria-expanded="false">
                                <FontAwesomeIcon icon={faUser}/> {AuthorizationLogic.getUserLogin()}
                            </button>
                            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                {profileElement}
                                <a className="dropdown-item"
                                   onClick={this.handleLogout}>
                                    Выйти
                                </a>
                            </div>
                        </div>
                    </li>
                </ul>
            </header>
        )
    }
}

export default HeaderContainer;