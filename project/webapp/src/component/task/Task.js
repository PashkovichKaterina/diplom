import React from 'react';
import "./task.css"
import Util from "../../service/Util";
import RedirectLogic from "../../service/RedirectLogic";

class Task extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {}
    }

    handleStartTask = () => {
        const {topicId, id} = this.props;
        RedirectLogic.redirect("/topics/" + topicId + "/tasks/" + id);
    };

    componentDidMount() {
        const {type, courseNumber} = this.props;
        const imageName = type.toLowerCase() + "-" + courseNumber;
        const tableImage = require('../../image/' + imageName + '.png');
        this.setState({taskImage: tableImage});
    }

    render() {
        const {title, questionCount} = this.props;
        return (
            <div className="task-wrapper">
                <div className="row task-block">
                    <div className="col-4 align-self-center text-center">
                        <img src={this.state.taskImage} className="task-image"/>
                    </div>
                    <div className="col-8 align-self-center">
                        <div className="task-header">{Util.capitalize(title)}</div>
                        <div className="task-question">{questionCount} вопросов</div>
                        <button className="task-button" onClick={this.handleStartTask}>
                            Начать
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}

export default Task;