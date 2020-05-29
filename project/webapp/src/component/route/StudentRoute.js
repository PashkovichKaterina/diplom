import React from 'react';
import {Route} from 'react-router-dom';
import AuthorizationLogic from "../../logic/AuthorizationLogic";
import RedirectLogic from "../../logic/RedirectLogic";

const StudentRoute = ({component: Component, path: path}) => {
    return (
        <Route exact path={path} render={props => (
            AuthorizationLogic.isStudentLogin()
                ? <Component {...props} />
                : AuthorizationLogic.isAdminLogin()
                ? RedirectLogic.redirectToAdminPanel()
                : RedirectLogic.redirectToLogin()
        )}/>
    )
};

export default StudentRoute;