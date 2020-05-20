import React from 'react';
import "./authentication.css"
import InputElement from "./InputElement";
import AuthenticationButton from "./AuthenticationButton";
import userImage from "../../image/user.png";
import RedirectLogic from "../../service/RedirectLogic";
import InformPopup from "../popup/InformPopup";
import UserService from "../../service/UserService";
import AuthorizationLogic from "../../service/AuthorizationLogic";
import FormValidator from "../../service/FormValidator";
import Util from "../../service/Util";

class StudentFormContainer extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            surname: "",
            name: "",
            isValidName: true,
            isValidSurname: true
        };
    }

    componentDidMount() {
        const userId = this.props.match.params.userId;
        if (userId != AuthorizationLogic.getUserId() || AuthorizationLogic.isStudentDataFill()) {
            RedirectLogic.redirectToUserProfile();
        }
    }

    handleKeyDown = (event) => {
        if (event.keyCode === 13 && !FormValidator.isValidSignupForm(this.state.login, this.state.email, this.state.password, this.state.confirmPassword)) {
            event.preventDefault();
        }
    };

    handleChange = (event) => {
        const {name, value} = event.target;
        this.setState({
            [name]: value
        });
        this.checkInputField(name, value);
    };

    checkInputField(name, value) {
        let field = `isValid${Util.capitalize(name)}`;
        let isValidField = false;
        switch (name) {
            case "name":
                isValidField = FormValidator.isValidName(value);
                break;
            case "surname":
                isValidField = FormValidator.isValidSurname(value);
                break;
        }
        this.setState({[field]: isValidField});
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const {name, surname} = this.state;
        UserService.editStudentData(name, surname)
            .then(() => AuthorizationLogic.refreshToken())
            .then(()=>RedirectLogic.redirectToUserProfile());
    };

    handleCancelClick = () => {
        this.setState({isShowInformPopup: true});
    };

    handleSkipClick = () => {
        RedirectLogic.redirectToUserProfile();
    };

    handleFillInForm = () => {
        this.setState({isShowInformPopup: false});
    };

    render() {
        const {surname, name, isShowInformPopup, isValidName, isValidSurname} = this.state;
        document.getElementById("root").style.padding = '0';
        const informPopupElement = isShowInformPopup && <InformPopup handleFillInForm={this.handleFillInForm}
                                                                     handleSkipClick={this.handleSkipClick}/>;
        return (
            <main className="login-main">
                {informPopupElement}
                <div className="container-fluid login-block">
                    <div className="row m-auto">
                        <div className="col-lg-6 text-center">
                            <div className="student-form-header">Персональные данные студента</div>
                            <form className="align-self-center"
                                  onSubmit={this.handleSubmit}
                                  onKeyDown={this.handleKeyDown}>
                                <InputElement type="text"
                                              name="surname"
                                              value={surname}
                                              isValid={isValidSurname}
                                              onChange={this.handleChange}/>
                                <InputElement type="text"
                                              name="name"
                                              value={name}
                                              isValid={isValidName}
                                              onChange={this.handleChange}/>
                                <AuthenticationButton submitButtonContent="Сохранить"
                                                      cancelButtonContent="Пропустить"
                                                      handleCancelClick={this.handleCancelClick}
                                                      isSubmitEnable={FormValidator.isValidPersonalDataForm(name, surname)}/>
                            </form>
                        </div>
                        <div className="col-lg-6 p-0 align-self-center text-center">
                            <img src={userImage} className="auth-image"/>
                        </div>
                    </div>
                </div>
            </main>
        )
    }
}

export default StudentFormContainer;