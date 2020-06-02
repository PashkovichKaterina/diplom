import React from 'react';
import "../admin.css";
import AddTopicHeader from "./AddTopicsHeader";
import AddAnswerRow from "./AddAnswerRow";
import AddMatchRow from "./AddMatchRow";
import {faTimes} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const AddAnswerElement = (props) => {
    const {taskNumber, onChangeInputElement, questions, addQuestionInTask, deleteQuestionInTask, deleteTask, title} = props;
    let i = 1;
    const questionsElement = questions.map(question => <AddAnswerRow key={question.id}
                                                                    type="question"
                                                                    questionTitle={question.questionTitle}
                                                                    correctAnswer={question.correctAnswer}
                                                                    taskNumber={taskNumber}
                                                                    questionNumber={i++}
                                                                    onChangeInputElement={onChangeInputElement}
                                                                    deleteQuestionInTask={deleteQuestionInTask}/>);
    return (
        <div className="add-task-block">
            <div className="add-topic-block-header">
                Задание {taskNumber} - Ввести ответ
                <FontAwesomeIcon icon={faTimes}
                                 className="delete-task-icon float-right"
                                 title="Удалить задание"
                                 task_number={taskNumber}
                                 onClick={deleteTask}/>
            </div>
            <div className="add-topic-block">
                <AddTopicHeader taskNumber={taskNumber}
                                title={title}
                                onChangeInputElement={onChangeInputElement}/>
                <AddAnswerRow type="header"/>

                {questionsElement}

                <AddMatchRow type="addMore"
                             taskNumber={taskNumber}
                             addQuestionInTask={addQuestionInTask}/>
            </div>
        </div>
    )
};

export default AddAnswerElement;