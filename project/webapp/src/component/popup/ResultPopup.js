import React from 'react';
import "./popup.css"
import "../../style/color.css";
import Util from "../../logic/Util";
import ResultLogic from "../../logic/ResultLogic";

const ResultPopup = (props) => {
    const {
        topicTitle, questionTitle, questionCount, wrongAnswerCount, correctAnswerCount,
        handleTaskFinish, courseNumber, questionType
    } = props;
    const result = ResultLogic.calculateResult(correctAnswerCount, wrongAnswerCount, questionCount);
    const resultMessageElement = questionType === "MATCH"
        ? <div>Количество неправильных ответов: {wrongAnswerCount}</div>
        : <div>Количество правильных ответов: {correctAnswerCount}</div>;
    return (
        <div className="result-popup">
            <div className="result-popup-wrapper">
                <div className="result-popup-task-title">{questionTitle.toUpperCase()}</div>
                <div className="result-popup-topic-title">{Util.capitalize(topicTitle)}</div>
                <div className="result-popup-messages">
                    <div>Количество вопросов: {questionCount}</div>
                    {resultMessageElement}
                </div>
                <div className="result-popup-result">Результат: {result}%</div>
                <button className="result-popup-button" onClick={handleTaskFinish}>
                    Продолжить
                </button>
            </div>
        </div>
    )
};

export default ResultPopup;