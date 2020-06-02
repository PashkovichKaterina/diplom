import React from 'react';
import "../admin.css";
import AddTopicHeader from "./AddTopicsHeader";
import AddChooseRow from "./AddChooseRow";
import AddChooseQuestion from "./AddChooseQuestion";
import {faTimes} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const AddChooseElement = (props) => {
    const {
        taskNumber, onChangeInputElement, questions, addQuestionInTask, deleteQuestionInTask, deleteTask, title,
        addOptionInQuestion, deleteOptionInQuestion
    } = props;
    let i = 1;
    const questionsElement = questions.map(question => <AddChooseQuestion key={question.id}
                                                                          questionTitle={question.questionTitle}
                                                                          answers={question.answers}
                                                                          taskNumber={taskNumber}
                                                                          questionNumber={i++}
                                                                          onChangeInputElement={onChangeInputElement}
                                                                          deleteQuestionInTask={deleteQuestionInTask}
                                                                          addOptionInQuestion={addOptionInQuestion}
                                                                          deleteOptionInQuestion={deleteOptionInQuestion}/>);
    return (
        <div className="add-task-block">
            <div className="add-topic-block-header">
                Задание {taskNumber} - Выбрать из вариантов
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
                <AddChooseRow type="header"/>

                {questionsElement}

                <AddChooseRow type="addMore"
                              taskNumber={taskNumber}
                              addQuestionInTask={addQuestionInTask}/>
            </div>
        </div>
    )
};

export default AddChooseElement;