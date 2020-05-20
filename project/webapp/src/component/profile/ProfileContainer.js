import React from 'react';
import "./profile.css"
import HeaderContainer from "../general/HeaderContainer";
import userPng from "../../image/user.png"
import Footer from "../general/Footer";
import AuthorizationLogic from "../../service/AuthorizationLogic";
import RedirectLogic from "../../service/RedirectLogic";
import TopicProfileContainer from "./TopicProfileContainer";

class ProfileContainer extends React.PureComponent {

    componentDidMount() {
        const userId = this.props.match.params.userId;
        if (userId != AuthorizationLogic.getUserId()) {
            RedirectLogic.redirectToUserProfile();
        }
    }

    handleStudentDataEdit = () => {
        RedirectLogic.redirectToEditStudentForm();
    };

    render() {
        const name = AuthorizationLogic.getStudentName() ? AuthorizationLogic.getStudentName() : "-";
        const surname = AuthorizationLogic.getStudentSurname() ? AuthorizationLogic.getStudentSurname() : "-";
        const button = !AuthorizationLogic.isStudentDataFill() &&
            <input type="button" value="Редактировать" className="edit-profile-button"
                   onClick={this.handleStudentDataEdit}/>;
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
                        <TopicProfileContainer/>
                        <TopicProfileContainer/>
                        <TopicProfileContainer/>
                        <TopicProfileContainer/>
                    </div>
                </div>
                <Footer/>
            </div>
        )
    }
}

export default ProfileContainer;