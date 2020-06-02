import React from 'react';
import "../admin.css";
import AddChooseRow from "./AddChooseRow";

const AddChooseQuestion = (props) => {
    const {
        key, questionTitle, answers, taskNumber, questionNumber, onChangeInputElement, deleteQuestionInTask,
        addOptionInQuestion, deleteOptionInQuestion
    } = props;
    const optionsElement = [];
    for (let i = 1; i < answers.length; i++) {
        optionsElement.push(<AddChooseRow key={answers[i].id}
                                          type="option"
                                          taskNumber={taskNumber}
                                          questionNumber={questionNumber}
                                          optionNumber={i + 1}
                                          onChangeInputElement={onChangeInputElement}
                                          deleteOptionInQuestion={deleteOptionInQuestion}/>)
    }
    return (
        <div className="">
            <AddChooseRow type="question"
                          key={key}
                          option={answers[0]}
                          questionTitle={questionTitle}
                          taskNumber={taskNumber}
                          questionNumber={questionNumber}
                          onChangeInputElement={onChangeInputElement}
                          deleteQuestionInTask={deleteQuestionInTask}
                          deleteOptionInQuestion={deleteOptionInQuestion}/>
            {optionsElement}
            <AddChooseRow type="addOption"
                          taskNumber={taskNumber}
                          questionNumber={questionNumber}
                          addOptionInQuestion={addOptionInQuestion}
                          deleteOptionInQuestion={deleteOptionInQuestion}/>
        </div>
    )
};

export default AddChooseQuestion;