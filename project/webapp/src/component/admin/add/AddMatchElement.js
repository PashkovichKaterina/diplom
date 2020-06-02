import React from 'react';
import "../admin.css";
import AddTopicHeader from "./AddTopicsHeader";
import AddMatchRow from "./AddMatchRow";
import {faTimes} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const AddMatchElement = (props) => {
    const {taskNumber, onChangeInputElement, questions, addQuestionInTask, deleteQuestionInTask, deleteTask, title} = props;
    let i = 1;
    const questionsElement = questions.map(question => <AddMatchRow key={question.id}
                                                                    type="question"
                                                                    firstPart={question.firstPart}
                                                                    secondPart={question.secondPart}
                                                                    taskNumber={taskNumber}
                                                                    questionNumber={i++}
                                                                    onChangeInputElement={onChangeInputElement}
                                                                    deleteQuestionInTask={deleteQuestionInTask}/>);
    return (
        <div className="add-task-block">
            <div className="add-topic-block-header">
                Задание {taskNumber} - Соединить
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
                <AddMatchRow type="header"/>

                {questionsElement}

                <AddMatchRow type="addMore"
                             taskNumber={taskNumber}
                             addQuestionInTask={addQuestionInTask}/>
            </div>
        </div>
    )
};

export default AddMatchElement;