import React from 'react';
import "./popup.css"

const InformPopup = (props) => {
    const {handleFillInForm, handleSkipClick} = props;
    return (
        <div className="result-popup">
            <div className="result-popup-wrapper">
                <div className="finish-task-popup-header">Пропустить заполнение персональных данных?</div>
                <div className="finish-task-popup-message">
                    Студенты, которые не заполнили персональные данные, не могут проходить задания. Персональные данные
                    можно будет заполнить после регистрации в личном кабинете.
                </div>
                <button className="finish-task-popup-button-active" onClick={handleFillInForm}>
                    Заполнить форму
                </button>
                <button className="finish-task-popup-button" onClick={handleSkipClick}>
                    Пропустить
                </button>
            </div>
        </div>
    )
};

export default InformPopup;