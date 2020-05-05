import React from 'react';
import "../question.css"
import completePng from "./../../..//image/complete.png"
import wrongPng from "./../../../image/wrong.png"

class ResultPanel extends React.PureComponent {
    render() {
        return (
            <div className="result-panel correct-answer-back">
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
            </div>

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