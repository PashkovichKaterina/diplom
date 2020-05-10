import React from 'react';
import {
    BrowserRouter,
    Route, Switch
} from 'react-router-dom';
import LoginContainer from "../authentication/LoginContainer";
import SignupContainer from "../authentication/SignupContainer";
import './App.css';
import TopicsContainer from "../topic/TopicsContainer";
import Tasks from "../task/Tasks";
import Profile from "../profile/Profile";
import MainPage from "../general/MainPage";
import NonAuthenticationRoute from "../route/NonAuthenticationRoute";
import StudentRoute from "../route/StudentRoute";
import Error404 from "../general/Error404";
import Question from "../question/Question";

function App() {
    return (
        <BrowserRouter>
            <Switch>

                <Route exact path="/users/1" render={() => <Profile/>}/>

                <Route exact path="/topics/:topicId/tasks/:taskId" render={(props) => <Question {...props}/>}/>
                <Route exact path="/topics/:id/tasks" render={(props) => <Tasks {...props}/>}/>
                <Route exact path="/404" render={() => <Error404/>}/>

                <StudentRoute component={TopicsContainer} path="/topics"/>

                <NonAuthenticationRoute component={LoginContainer} path="/login"/>
                <NonAuthenticationRoute component={SignupContainer} path="/signup"/>
                <NonAuthenticationRoute component={MainPage} path="/"/>
            </Switch>
        </BrowserRouter>
    );
}

export default App;
