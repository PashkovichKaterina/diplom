import React from 'react';
import {Route} from 'react-router-dom';
import AuthorizationLogic from "../../service/AuthorizationLogic";
import RedirectLogic from "../../service/RedirectLogic";

const NonAuthenticationRoute = ({component: Component}) => {
    return (
        <Route render={props => (
            AuthorizationLogic.isStudentLogin()
                ? RedirectLogic.redirectToTopics()
                : <Component {...props} />
        )}/>
    )
};

export default NonAuthenticationRoute;