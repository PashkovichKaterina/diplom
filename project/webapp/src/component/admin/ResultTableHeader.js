import React from 'react';

const ResultTableHeader = (props) => {
    const {topic} = props;
    let i = 1;
    const taskList = (topic && topic.tasks) && topic.tasks.map(task => <th key={task.id}>{i++}</th>);
    return (
        <thead>
        <tr>
            <th className="w-50 text-left">Фамилия Имя</th>
            <th>№ попытки</th>
            {taskList}
            <th>Общий результат</th>
        </tr>
        </thead>
    )
};

export default ResultTableHeader;