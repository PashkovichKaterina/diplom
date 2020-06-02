import React from 'react';
import "../admin.css";
import {faTimes} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const AddMatchRow = (props) => {
    const {onChangeInputElement, questionNumber, taskNumber, addQuestionInTask, deleteQuestionInTask, firstPart, secondPart} = props;
    let questionNumberElement, firstPartElement, secondPartElement;
    switch (props.type) {
        case "header":
            questionNumberElement = "";
            firstPartElement = "Первая часть";
            secondPartElement = "Вторая часть";
            break;
        case "question":
            questionNumberElement = <div>{questionNumber} <FontAwesomeIcon icon={faTimes}
                                                                           className="delete-question-icon"
                                                                           title="Удалить вопрос"
                                                                           task_number={taskNumber}
                                                                           question_number={questionNumber}
                                                                           onClick={deleteQuestionInTask}/></div>;
            firstPartElement = <input className="add-topic-input"
                                      name="firstPart"
                                      task_number={taskNumber}
                                      question_number={questionNumber}
                                      value={firstPart}
                                      onChange={onChangeInputElement}/>;
            secondPartElement = <input className="add-topic-input"
                                       name="secondPart"
                                       task_number={taskNumber}
                                       question_number={questionNumber}
                                       value={secondPart}
                                       onChange={onChangeInputElement}/>;
            break;
        case "addMore":
            questionNumberElement = "";
            firstPartElement = <i id={taskNumber}
                                  onClick={addQuestionInTask}>
                + Добавить вопрос
            </i>;
            secondPartElement = "";
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
                        {firstPartElement}
                    </div>
                    <div className="col-6">
                        {secondPartElement}
                    </div>
                </div>
            </div>
        </div>
    )
};

export default AddMatchRow;