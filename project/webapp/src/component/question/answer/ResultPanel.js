import React from 'react';
import "../question.css"
import completePng from "./../../..//image/complete.png"
import wrongPng from "./../../../image/wrong.png"

class ResultPanel extends React.PureComponent {
    render() {
        const {answerStatus, isAvailableButtonClick, buttonClick, correctAnswer} = this.props;
        let panelClass;
        let buttonClass = "result-panel-button";
        let buttonText = "Проверить";
        let answerText;
        let answerClass;
        let image;
        switch (answerStatus) {
            case true:
                panelClass = "correct-answer-back";
                answerText = "Правильный ответ";
                answerClass = "result-panel-correct-answer";
                buttonClass = "result-panel-correct-button";
                image = completePng;
                buttonText = "Дальше";
                break;
            case false:
                panelClass = "wrong-answer-back";
                answerText = "Неправильный ответ";
                answerClass = "result-panel-wrong-answer";
                buttonClass = "result-panel-wrong-button";
                image = wrongPng;
                buttonText = "Дальше";
                break;
        }
        const answerMessageElement = <div className={answerClass}>{answerText}</div>
        const errorMessage = correctAnswer && <div className="answer-message">Правильный ответ: {correctAnswer}</div>
        return (
            <div className={`result-panel ${panelClass}`}>
                <div className="container question-wrapper">
                    <div className="row">
                        <div className="col-2 align-self-center text-center">
                            <img src={image} className="w-50"/>
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
            /*<div className="result-panel correct-answer-back">
                <div className="container question-wrapper">
                    <div className="row">
                        <div className="col-2 align-self-center text-center">
                            <img src={completePng} className="w-50"/>
                        </div>
                        <div className="col-6 align-self-center result-panel-correct-answer">
                            Правильный ответ
                        </div>
                        <div className="col-4 align-self-center">
                            <input type="button" className="result-panel-button" value="Проверить"/>
                        </div>
                    </div>
                </div>
            </div>*/

            /*<div className="result-panel wrong-answer-back ">
                <div className="container question-wrapper">
                    <div className="row">
                        <div className="col-2 align-self-center text-center">
                            <img src={wrongPng} className="w-50"/>
                        </div>
                        <div className="col-6 align-self-center">
                            <div className="result-panel-wrong-answer">Неправильный ответ</div>
                            <div className="answer-message">Правильный ответ: answer</div>
                        </div>
                        <div className="col-4 align-self-center">
                            <input type="button" className="result-panel-button" value="Проверить"/>
                        </div>
                    </div>
                </div>
            </div>*/
        )
    }
}

export default ResultPanel;