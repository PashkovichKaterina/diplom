import React from 'react';
import {faUser} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import AuthorizationLogic from "../../service/AuthorizationLogic";
import RedirectLogic from "../../service/RedirectLogic";

class HeaderContainer extends React.PureComponent {
    handleLogout = () => {
        AuthorizationLogic.deleteTokens();
        RedirectLogic.redirectToLogin();
    };

    render() {
        const {isMain} = this.props;
        return (
            <header
                className={isMain ? "container-fluid d-table text-right main" : "container-fluid d-table text-right ba"}>
                <div className="d-inline float-left site-title">English2C</div>
                <ul className="right-nav d-inline">
                    <li><a href="/topics">Темы</a></li>
                    <li>
                        <div className="dropdown">
                            <button className="dropdown-toggle" id="dropdownMenuButton" data-toggle="dropdown"
                                    aria-haspopup="true"
                                    aria-expanded="false">
                                <FontAwesomeIcon icon={faUser}/> {AuthorizationLogic.getUserLogin()}
                            </button>
                            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                <a className="dropdown-item" href="/users/1">Личный кабинет</a>
                                <a className="dropdown-item" onClick={this.handleLogout}>Выйти</a>
                            </div>
                        </div>
                    </li>
                </ul>
            </header>
        )
    }
}

export default HeaderContainer;