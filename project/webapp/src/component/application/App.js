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
import ChooseQuestion from "../question/ChooseQuestion";
import InsertQuestion from "../question/InsertQuestion";
import AnswerQuestion from "../question/AnswerQuestion";
import MatchQuestion from "../question/MatchQuestion";
import Profile from "../profile/Profile";
import MainPage from "../general/MainPage";
import NonAuthenticationRoute from "../route/NonAuthenticationRoute";
import StudentRoute from "../route/StudentRoute";

function App() {
    return (
        <BrowserRouter>
            <Switch>

                <Route exact path="/users/1" render={() => <Profile/>}/>

                <Route exact path="/topics/1/tasks/4" render={() => <MatchQuestion/>}/>
                <Route exact path="/topics/1/tasks/3" render={() => <AnswerQuestion/>}/>
                <Route exact path="/topics/1/tasks/2" render={() => <InsertQuestion/>}/>
                <Route exact path="/topics/1/tasks/1" render={() => <ChooseQuestion/>}/>

                <Route exact path="/topics/1/tasks" render={() => <Tasks/>}/>

                {/*<StudentRoute component={Tasks} path="/topics/1/task"/>*/}
                <StudentRoute component={TopicsContainer} path="/topics"/>

                <NonAuthenticationRoute component={LoginContainer} path="/login"/>
                <NonAuthenticationRoute component={SignupContainer} path="/signup"/>
                <NonAuthenticationRoute component={MainPage} path="/"/>
            </Switch>
        </BrowserRouter>
    );
}

export default App;
