import React from 'react';
import "./popup.css"

const EmptyDataPopup = (props) => {
    const {handleFillInForm, handleSkipClick} = props;
    return (
        <div className="result-popup">
            <div className="result-popup-wrapper">
                <div className="finish-task-popup-header">Пропустить заполнение персональных данных?</div>
                <div className="finish-task-popup-message">
                    Студенты, которые не заполнили персональные данные, не могут проходить задания. Перейдите в личный
                    кабинет, чтобы заполнить данные о себе.
                </div>
                <button className="finish-task-popup-button" onClick={handleFillInForm}>
                    Перейти в личный кабинет
                </button>
                <button className="finish-task-popup-button" onClick={handleSkipClick}>
                    Вернуться к теме
                </button>
            </div>
        </div>
    )
};

export default EmptyDataPopup;