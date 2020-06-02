import React from 'react';
import "../admin.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTimes} from "@fortawesome/free-solid-svg-icons";

const AddAnswerRow = (props) => {
    const {onChangeInputElement, questionNumber, taskNumber, addQuestionInTask, deleteQuestionInTask, questionTitle, correctAnswer} = props;
    let questionNumberElement, titleElement, answerElement;
    switch (props.type) {
        case "header":
            questionNumberElement = "";
            titleElement = "Заголовок";
            answerElement = "Правильный ответ";
            break;
        case "question":
            questionNumberElement = <div>{questionNumber} <FontAwesomeIcon icon={faTimes}
                                                                           className="delete-question-icon"
                                                                           title="Удалить вопрос"
                                                                           task_number={taskNumber}
                                                                           question_number={questionNumber}
                                                                           onClick={deleteQuestionInTask}/></div>;
            titleElement = <input className="add-topic-input"
                                  name="questionTitle"
                                  task_number={taskNumber}
                                  question_number={questionNumber}
                                  value={questionTitle}
                                  onChange={onChangeInputElement}/>;
            answerElement = <input className="add-topic-input"
                                   name="correctAnswer"
                                   task_number={taskNumber}
                                   question_number={questionNumber}
                                   value={correctAnswer}
                                   onChange={onChangeInputElement}/>;
            break;
        case "addMore":
            questionNumberElement = "";
            titleElement = <i id={taskNumber}
                                  onClick={addQuestionInTask}>
                + Добавить вопрос
            </i>;
            answerElement = "";
            break;
    }
    return (
        <div className="row add-topic-question-block">
            <div className="col-1 align-self-center question-number">
                {questionNumberElement}
            </div>
            <div className="col-11">
                <div className="row">
                    <div className="col-6">
                        {titleElement}
                    </div>
                    <div className="col-6">
                        {answerElement}
                    </div>
                </div>
            </div>
        </div>
    )
};

export default AddAnswerRow;