import React from 'react';
import "./task.css"

class Task extends React.PureComponent {
    render() {
        return (
            <div className="task-wrapper">
                <div className="row task-block">
                    <div className="col-4 align-self-center text-center">
                        <img src="../image/connect-1.png" className="img-lesson-icon"/>
                    </div>
                    <div className="col-8 align-self-center">
                        <div className="task-header">Choose the definition</div>
                        <div className="task-question">6 вопросов</div>
                        <button className="task-button">
                            Начать
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}

export default Task;