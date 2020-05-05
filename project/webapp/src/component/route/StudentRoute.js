import React from 'react';
import {Route} from 'react-router-dom';
import AuthorizationLogic from "../../service/AuthorizationLogic";
import RedirectLogic from "../../service/RedirectLogic";

const StudentRoute = ({component: Component}) => {
    return (
        <Route render={props => (
            AuthorizationLogic.isStudentLogin()
                ? <Component {...props} />
                : RedirectLogic.redirectToLogin()
        )}/>
    );
};

export default StudentRoute;