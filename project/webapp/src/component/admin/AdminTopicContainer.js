import React from 'react';
import "./admin.css";
import RedirectLogic from "../../logic/RedirectLogic";
import Util from "../../logic/Util";

class AdminTopicContainer extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {}
    }

    handleScoresView = () => {
        const {id} = this.props;
        RedirectLogic.redirectToTopicScores(id);
    };

    render() {
        const {title, courseNumber, taskCount} = this.props;
        return (
            <div className="admin-task-wrapper">
                <div className="row admin-task-block">
                    <div className="col-md-9">
                        <div className="admin-panel-topic-title">{title.toUpperCase()}</div>
                        <div className="admin-panel-message">{taskCount} {Util.getTaskDeclension(taskCount)}</div>
                        <div className="admin-panel-message">{courseNumber} курс</div>
                    </div>
                    <div className="col-lg-3 text-center align-self-center">
                        <button className="admin-panel-button-active" onClick={this.handleScoresView}>
                            Просмотреть результаты
                        </button>
                        <button className="admin-panel-button">Редактировать</button>
                        <button className="admin-panel-button">Удалить</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default AdminTopicContainer;