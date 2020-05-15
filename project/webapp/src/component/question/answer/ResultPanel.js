import React from 'react';
import "../question.css"
import "../../../style/color.css"
import {faTimesCircle} from "@fortawesome/free-solid-svg-icons";
import {faCheckCircle} from "@fortawesome/free-solid-svg-icons";
import {faClock} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

class ResultPanel extends React.PureComponent {
    render() {
        const {answerStatus, isAvailableButtonClick, buttonClick, correctAnswer} = this.props;
        let panelClass;
        let buttonClass = "result-panel-button";
        let buttonText = "Проверить";
        let answerText;
        let answerClass;
        let icon;
        switch (answerStatus) {
            case true:
                panelClass = "correct-answer-back";
                answerText = "Правильный ответ";
                answerClass = "correct-answer-color";
                buttonClass = "result-panel-correct-button";
                buttonText = "Дальше";
                icon = <FontAwesomeIcon icon={faCheckCircle} className="result-icon correct-answer-color"/>;
                break;
            case false:
                panelClass = "wrong-answer-back";
                answerText = "Неправильный ответ";
                answerClass = "wrong-answer-color";
                buttonClass = "result-panel-wrong-button";
                buttonText = "Дальше";
                icon = <FontAwesomeIcon icon={faTimesCircle} className="result-icon wrong-answer-color"/>;
                break;
        }
        const answerMessageElement = <div className={`${answerClass}`}>{answerText}</div>
        const errorMessage = correctAnswer && <div className={`answer-message ${answerClass}`}>Правильный ответ: {correctAnswer}</div>
        return (
            <div className={`result-panel ${panelClass}`}>
                <div className="container question-wrapper">
                    <div className="row">
                        <div className="col-2 align-self-center text-center">
                            {icon}
                        </div>
                        <div className="col-6 align-self-center">
                            {answerMessageElement}
                            {errorMessage}
                        </div>
                        <div className="col-4 align-self-center">
                            {
                                isAvailableButtonClick
                                    ? <input type="button"
                                             className={buttonClass}
                                             value={buttonText}
                                             onClick={buttonClick}/>
                                    : <input type="button" disabled
                                             className={buttonClass}
                                             value={buttonText}
                                             onClick={buttonClick}/>
                            }

                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ResultPanel;