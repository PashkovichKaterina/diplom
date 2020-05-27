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
import AddTopicFormContainer from "../admin/AddTopicFormContainer";
import AdminPanel from "../admin/AdminPanel";
import AdminRoute from "../route/AdminRoute";
import ResultTableContainer from "../admin/ResultTableContainer";

function App() {
    return (
        <BrowserRouter>
            <Switch>
                <AdminRoute exact component={ResultTableContainer} path="/topics/:topicId"/>
                <AdminRoute exact component={AddTopicFormContainer} path="/topics/add"/>
                <AdminRoute exact component={AdminPanel} path="/admin"/>

                <StudentRoute exact component={StudentFormContainer} path="/users/:userId/edit"/>
                <StudentRoute exact component={ProfileContainer} path="/users/:userId"/>
                <StudentRoute exact component={QuestionContainer} path="/topics/:topicId/tasks/:taskId"/>
                <StudentRoute exact component={TasksContainer} path="/topics/:id/tasks"/>
                <StudentRoute exact component={TopicsContainer} path="/topics"/>

                <NonAuthenticationRoute exact component={LoginContainer} path="/login"/>
                <NonAuthenticationRoute exact component={SignupContainer} path="/signup"/>
                <NonAuthenticationRoute exact component={MainPageContainer} path="/"/>

                <Route component={Error404}/>

            </Switch>
        </BrowserRouter>
    );
}

export default App;
