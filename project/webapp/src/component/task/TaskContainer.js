import React from 'react';
import "./task.css"
import Util from "../../logic/Util";
import RedirectLogic from "../../logic/RedirectLogic";

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
        const {title, questionCount, lastValue, courseNumber} = this.props;
        const lastValueMessage = (lastValue || lastValue === 0) &&
            <div className="task-status-message">Последний результат: {lastValue}%</div>;
        return (
            <div className="task-wrapper">
                <div className="row task-block">
                    <div className="col-4 align-self-center text-center">
                        <img src={this.state.taskImage} className="task-image"/>
                    </div>
                    <div className="col-8 align-self-center">
                        <div className="task-header">{Util.capitalize(title)}</div>
                        <div className="task-question">{questionCount} {Util.getQuestionDeclension(questionCount)}</div>
                        {lastValueMessage}
                        <button className={`task-button course-${courseNumber}`} onClick={this.handleStartTask}>
                            Начать
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}

export default TaskContainer;