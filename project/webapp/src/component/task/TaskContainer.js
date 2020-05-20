import React from 'react';
import "./task.css"
import Util from "../../service/Util";
import RedirectLogic from "../../service/RedirectLogic";

class TaskContainer extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {}
    }

    handleStartTask = () => {
        const {topicId, id} = this.props;
        RedirectLogic.redirectToTask(topicId, id);
    };

    componentDidMount() {
        const {type, courseNumber} = this.props;
        const imageName = type.toLowerCase() + "-" + courseNumber;
        const tableImage = require('../../image/' + imageName + '.png');
        this.setState({taskImage: tableImage});
    }

    render() {
        const {title, questionCount, status, value, courseNumber} = this.props;
        let contentElement;
        switch (status) {
            case "in progress":
                contentElement = <div className="task-status-message">В процессе</div>
                break;
            case "completed":
                contentElement = <div className="task-status-message">Ваш результат: {value}%</div>
                break;
            default:
                contentElement =
                    <button className={`task-button course-${courseNumber}`} onClick={this.handleStartTask}>
                        Начать
                    </button>;
                break;
        }
        return (
            <div className="task-wrapper">
                <div className="row task-block">
                    <div className="col-4 align-self-center text-center">
                        <img src={this.state.taskImage} className="task-image"/>
                    </div>
                    <div className="col-8 align-self-center">
                        <div className="task-header">{Util.capitalize(title)}</div>
                        <div className="task-question">Вопросы: {questionCount}</div>
                        {contentElement}
                    </div>
                </div>
            </div>
        )
    }
}

export default TaskContainer;