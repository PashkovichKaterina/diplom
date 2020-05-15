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
import Profile from "../profile/Profile";
import MainPageContainer from "../general/MainPageContainer";
import NonAuthenticationRoute from "../route/NonAuthenticationRoute";
import StudentRoute from "../route/StudentRoute";
import Error404 from "../general/Error404";
import QuestionContainer from "../question/QuestionContainer";

function App() {
    return (
        <BrowserRouter>
            <Switch>

                <Route exact path="/users/1" render={() => <Profile/>}/>

                <Route exact path="/topics/:topicId/tasks/:taskId" render={(props) => <QuestionContainer {...props}/>}/>
                <Route exact path="/topics/:id/tasks" render={(props) => <TasksContainer {...props}/>}/>
                <Route exact path="/404" render={() => <Error404/>}/>

                <StudentRoute component={TopicsContainer} path="/topics"/>

                <NonAuthenticationRoute component={LoginContainer} path="/login"/>
                <NonAuthenticationRoute component={SignupContainer} path="/signup"/>
                <NonAuthenticationRoute component={MainPageContainer} path="/"/>
            </Switch>
        </BrowserRouter>
    );
}

export default App;
