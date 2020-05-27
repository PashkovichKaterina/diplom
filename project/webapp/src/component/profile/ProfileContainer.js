import React from 'react';
import "./profile.css"
import HeaderContainer from "../general/HeaderContainer";
import userPng from "../../image/user.png"
import Footer from "../general/Footer";
import AuthorizationLogic from "../../logic/AuthorizationLogic";
import RedirectLogic from "../../logic/RedirectLogic";
import TopicProfileContainer from "./TopicProfileContainer";
import UserService from "../../service/UserService";

class ProfileContainer extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            passedTasks: []
        }
    }

    componentDidMount() {
        const userId = this.props.match.params.userId;
        if (userId != AuthorizationLogic.getUserId()) {
            RedirectLogic.redirectToUserProfile();
        }
        UserService.getPassedTopic()
            .then(response => response.json())
            .then(json => this.setState({passedTasks: json}));
    }

    handleStudentDataEdit = () => {
        RedirectLogic.redirectToEditStudentForm();
    };

    render() {
        const {passedTasks} = this.state;
        const name = AuthorizationLogic.getStudentName() ? AuthorizationLogic.getStudentName() : "-";
        const surname = AuthorizationLogic.getStudentSurname() ? AuthorizationLogic.getStudentSurname() : "-";
        const button = !AuthorizationLogic.isStudentDataFill() &&
            <input type="button" value="Редактировать" className="edit-profile-button"
                   onClick={this.handleStudentDataEdit}/>;
        const passedTopicsContent = passedTasks.length > 0
            ? passedTasks.map(topic =>
                <TopicProfileContainer key={topic.id}
                                       id={topic.id}
                                       topicTitle={topic.title}
                                       courseNumber={topic.courseNumber}
                                       taskCount={topic.tasks.length}
                                       status={topic.status}
                                       tasks={topic.tasks}/>)
            : <div className="col-12">Вы еще не прошли ни одного урока</div>;
        return (
            <div>
                <HeaderContainer/>
                <div className="container">
                    <div className="profile-card">
                        <div className="row">
                            <div className="col-lg-6 align-self-center text-center">
                                <img src={userPng} className="user-icon"/>
                            </div>
                            <div className="col-lg-6 align-self-center">
                                <div className="qa-element">
                                    <span className="profile-feature">Фамилия: </span>
                                    <span className="profile-value">{surname}</span>
                                </div>
                                <div className="qa-element">
                                    <span className="profile-feature">Имя: </span>
                                    <span className="profile-value">{name}</span>
                                </div>
                                {button}
                            </div>
                        </div>
                    </div>

                    <div className="topics-header">ПРОЙДЕННЫЕ ТЕМЫ</div>
                    <div className="row">
                        {passedTopicsContent}
                    </div>
                </div>
                <Footer/>
            </div>
        )
    }
}

export default ProfileContainer;