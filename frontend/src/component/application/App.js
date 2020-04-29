import React from 'react';
import './App.css';
import {
    BrowserRouter,
    Route, Switch
} from 'react-router-dom';
import Topics from "../topic/Topics";
import Tasks from "../task/Tasks";
import ChooseQuestion from "../question/ChooseQuestion";
import InsertQuestion from "../question/InsertQuestion";
import AnswerQuestion from "../question/AnswerQuestion";
import MatchQuestion from "../question/MatchQuestion";
import Profile from "../profile/Profile";
import Login from "../auth/Login";
import Signup from "../auth/Signup";

function App() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/topics/1/tasks/4" render={() => <MatchQuestion/>}/>
                <Route path="/topics/1/tasks/3" render={() => <AnswerQuestion/>}/>
                <Route path="/topics/1/tasks/2" render={() => <InsertQuestion/>}/>
                <Route path="/topics/1/tasks/1" render={() => <ChooseQuestion/>}/>
                <Route path="/topics/1/tasks" render={() => <Tasks/>}/>
                <Route path="/topics" render={() => <Topics/>}/>

                <Route path="/users/1" render={() => <Profile/>}/>
                <Route path="/login" render={() => <Login/>}/>
                <Route path="/signup" render={() => <Signup/>}/>
            </Switch>
        </BrowserRouter>
    );
}

export default App;
