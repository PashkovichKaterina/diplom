import React from 'react';
import {Route} from 'react-router-dom';
import AuthorizationLogic from "../../logic/AuthorizationLogic";
import RedirectLogic from "../../logic/RedirectLogic";

const AdminRoute = ({component: Component, path: path}) => {
    return (
        <Route exact path={path} render={props => (
            AuthorizationLogic.isAdminLogin()
                ? <Component {...props}/>
                : AuthorizationLogic.isUserLogin()
                ? RedirectLogic.redirectToTopics()
                : RedirectLogic.redirectToLogin()
        )}/>
    );
};

export default AdminRoute;