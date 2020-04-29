import React from 'react';
import Task from "./Task";

class TaskList extends React.PureComponent {
    render() {
        return (
            <div>
                <Task/>
                <Task/>
            </div>
        )
    }
}

export default TaskList;