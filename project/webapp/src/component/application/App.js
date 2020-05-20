import React from 'react';
import {
    BrowserRouter,
    Route, Switch
} from 'react-router-dom';
import LoginContainer from "../authentication/LoginContainer";
import SignupContainer from "../authentication/SignupContainer";
import './App.css';
import TopicsContainer from "../topic/TopicsContainer";
import TasksContainer from "../task/TasksContainer";
import ProfileContainer from "../profile/ProfileContainer";
import MainPageContainer from "../general/MainPageContainer";
import NonAuthenticationRoute from "../route/NonAuthenticationRoute";
import StudentRoute from "../route/StudentRoute";
import Error404 from "../general/Error404";
import QuestionContainer from "../question/QuestionContainer";
import StudentFormContainer from "../authentication/StudentFormContainer";

function App() {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/404" render={() => <Error404/>}/>

                <StudentRoute component={StudentFormContainer} path="/users/:userId/edit"/>
                <StudentRoute component={ProfileContainer} path="/users/:userId"/>
                <StudentRoute component={QuestionContainer} path="/topics/:topicId/tasks/:taskId"/>
                <StudentRoute component={TasksContainer} path="/topics/:id/tasks"/>
                <StudentRoute component={TopicsContainer} path="/topics"/>

                <NonAuthenticationRoute component={LoginContainer} path="/login"/>
                <NonAuthenticationRoute component={SignupContainer} path="/signup"/>
                <NonAuthenticationRoute component={MainPageContainer} path="/"/>
            </Switch>
        </BrowserRouter>
    );
}

export default App;
