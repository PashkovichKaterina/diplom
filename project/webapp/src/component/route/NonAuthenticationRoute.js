import React from 'react';
import {Route} from 'react-router-dom';
import AuthorizationLogic from "../../logic/AuthorizationLogic";
import RedirectLogic from "../../logic/RedirectLogic";

const NonAuthenticationRoute = ({component: Component, path: path, props: props}) => {
    return (
        <Route path={path} render={props => (
            AuthorizationLogic.isStudentLogin()
                ? RedirectLogic.redirectToTopics()
                : AuthorizationLogic.isAdminLogin()
                ? RedirectLogic.redirectToAdminPanel()
                : <Component {...props} />
        )
        }/>
    )
};

export default NonAuthenticationRoute;