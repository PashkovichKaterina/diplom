import React from 'react';
import "../admin.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTimes} from "@fortawesome/free-solid-svg-icons";

const AddChooseRow = (props) => {
    const {
        addQuestionInTask, taskNumber, questionNumber, deleteQuestionInTask, addOptionInQuestion,
        deleteOptionInQuestion, optionNumber, questionTitle, onChangeInputElement, optionTitle, option
    } = props;
    let questionNumberElement, titleElement, answerElement, checkElement;
    switch (props.type) {
        case "header":
            questionNumberElement = "";
            titleElement = "Вопрос";
            answerElement = "Варианты ответа";
            checkElement = "Правильный?";
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
            answerElement = <div><input className="add-topic-input"
                                        name="optionTitle"
                                        task_number={taskNumber}
                                        question_number={questionNumber}
                                        option_number={1}
                                        value={option.optionTitle}
                                        onChange={onChangeInputElement}/> <FontAwesomeIcon icon={faTimes}
                                                                                           className="delete-question-icon"
                                                                                           title="Удалить вариант"
                                                                                           task_number={taskNumber}
                                                                                           question_number={questionNumber}
                                                                                           option_number={1}
                                                                                           onClick={deleteOptionInQuestion}/>
            </div>;
            checkElement = <input type="checkbox"
                                  name="status"
                                  task_number={taskNumber}
                                  question_number={questionNumber}
                                  option_number={1}
                                  onChange={onChangeInputElement}/>;
            break;
        case "option":
            questionNumberElement = "";
            titleElement = "";
            answerElement = <div><input className="add-topic-input"
                                        name="optionTitle"
                                        task_number={taskNumber}
                                        question_number={questionNumber}
                                        option_number={optionNumber}
                                        value={optionTitle}
                                        onChange={onChangeInputElement}/> <FontAwesomeIcon icon={faTimes}
                                                                                           className="delete-question-icon"
                                                                                           title="Удалить вариант"
                                                                                           task_number={taskNumber}
                                                                                           question_number={questionNumber}
                                                                                           option_number={optionNumber}
                                                                                           onClick={deleteOptionInQuestion}/>
            </div>;
            checkElement = <input type="checkbox"
                                  name="status"
                                  task_number={taskNumber}
                                  question_number={questionNumber}
                                  option_number={optionNumber}
                                  onChange={onChangeInputElement}/>;
            break;
        case "addMore":
            questionNumberElement = "";
            titleElement = <i id={taskNumber}
                              onClick={addQuestionInTask}>
                + Добавить вопрос
            </i>;
            answerElement = "";
            checkElement = "";
            break;
        case "addOption":
            questionNumberElement = "";
            titleElement = "";
            answerElement = <i task_number={taskNumber}
                               question_number={questionNumber}
                               onClick={addOptionInQuestion}>
                + Добавить вариант
            </i>;
            checkElement = "";
            break;
    }
    return (
        <div className="row add-topic-question-block">
            <div className="col-1 align-self-center question-number">
                {questionNumberElement}
            </div>
            <div className="col-11">
                <div className="row">
                    <div className="col-5">
                        {titleElement}
                    </div>
                    <div className="col-5">
                        {answerElement}
                    </div>
                    <div className="col-2 align-self-center text-center">
                        {checkElement}
                    </div>
                </div>
            </div>
        </div>
    )
};

export default AddChooseRow;