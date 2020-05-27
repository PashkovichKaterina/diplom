import React from 'react';
import "./admin.css";
import Util from "../../logic/Util";

const ResultTaskList = (props) => {
    const {topic} = props;
    let i = 1;
    const taskList = (topic && topic.tasks) && topic.tasks.map(task => <li key={task.id}>{i++}. {Util.capitalize(task.title)}</li>);
    return (
        <div>
            <div className="task-list-header">Список заданий</div>
            <ol>
                {taskList}
            </ol>
        </div>
    )
};

export default ResultTaskList;