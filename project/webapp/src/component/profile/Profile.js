import React from 'react';
import "./profile.css"
import HeaderContainer from "../general/HeaderContainer";
import userPng from "../../image/user.png"
import Footer from "../general/Footer";

class Profile extends React.PureComponent {
    render() {
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
                                    <span className="profile-value">Фамилия</span>
                                </div>
                                <div className="qa-element">
                                    <span className="profile-feature">Имя: </span>
                                    <span className="profile-value">Имя</span>
                                </div>
                                <div className="qa-element">
                                    <span className="profile-feature">Отчество: </span>
                                    <span className="profile-value">Отчество</span>
                                </div>
                                <input type="button" value="Редактировать" className="edit-profile-button"/>
                            </div>
                        </div>
                    </div>

                    <div className="topics-header">ПРОЙДЕННЫЕ ТЕМЫ</div>
                </div>
                <Footer/>
            </div>
        )
    }
}

export default Profile;