import React from 'react';
import "../admin.css";

const AddTopicHeader = (props) => {
    const {onChangeInputElement, taskNumber, title} = props;
    return (
        <div>
            <label className="add-topic-label">Заголовок</label>
            <input className="add-topic-input"
                   name="title"
                   value={title}
                   task_number={taskNumber}
                   onChange={onChangeInputElement}/>
            <label className="add-topic-label mt-5">Вопросы</label>
        </div>
    )
};

export default AddTopicHeader;