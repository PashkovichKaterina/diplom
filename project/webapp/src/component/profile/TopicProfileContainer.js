import React from 'react';
import "./profile.css"
import RedirectLogic from "../../logic/RedirectLogic";
import Util from "../../logic/Util";
import ResultLogic from "../../logic/ResultLogic";

class TopicProfileContainer extends React.PureComponent {
    handleTopicRedirect = () => {
        const {id} = this.props;
        RedirectLogic.redirectToTopic(id);
    };

    render() {
        const {topicTitle, taskCount, courseNumber, tasks, status} = this.props;
        const message = status === "completed"
            ? <div className="profile-topic-result">Ваш результат: {ResultLogic.calculateTopicScore(tasks)}%</div>
            : <div className="profile-topic-result">В процессе</div>;
        return (
            <div className="col-6 m-0">
                <div className="profile-topic" onClick={this.handleTopicRedirect}>
                    <div className="profile-topic-title">{topicTitle.toUpperCase()}</div>
                    <div className="profile-topic-tasks">{taskCount} {Util.getTaskDeclension(taskCount)}</div>
                    <div className="profile-topic-tasks">{courseNumber} курс</div>
                    {message}
                </div>
            </div>
        )
    }
}

export default TopicProfileContainer;