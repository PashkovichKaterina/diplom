import React from 'react';
import "./popup.css"
import "../../style/color.css";
import Util from "../../service/Util";
import ResultLogic from "../../service/ResultLogic";

const ResultPopup = (props) => {
    const {topicTitle, questionTitle, questionCount, wrongAnswerCount, correctAnswerCount, handleTaskFinish, courseNumber} = props;
    const result = correctAnswerCount !== null
        ? ResultLogic.calculateResultOfCorrectAnswer(correctAnswerCount, questionCount)
        : ResultLogic.calculateResultOfWrongAnswer(wrongAnswerCount, questionCount);
    const resultMessageElement = correctAnswerCount !== null
        ? <div>Количество правильных ответов: {correctAnswerCount}</div>
        : <div>Количество неправильных ответов: {wrongAnswerCount}</div>;
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
                <button className={`result-popup-button course-${courseNumber}`} onClick={handleTaskFinish}>
                    Продолжить
                </button>
            </div>
        </div>
    )
};

export default ResultPopup;