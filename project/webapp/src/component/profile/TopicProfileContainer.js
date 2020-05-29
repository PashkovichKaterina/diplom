import React from 'react';
import "./profile.css"
import RedirectLogic from "../../logic/RedirectLogic";
import Util from "../../logic/Util";

class TopicProfileContainer extends React.PureComponent {
    handleTopicRedirect = () => {
        const {id} = this.props;
        RedirectLogic.redirectToTopic(id);
    };

    render() {
        const {topicTitle, taskCount, courseNumber} = this.props;
        return (
            <div className="col-6 m-0">
                <div className="profile-topic" onClick={this.handleTopicRedirect}>
                    <div className="profile-topic-title">{topicTitle.toUpperCase()}</div>
                    <div className="profile-topic-tasks">{taskCount} {Util.getTaskDeclension(taskCount)}</div>
                    <div className="profile-topic-tasks">{courseNumber} курс</div>
                </div>
            </div>
        )
    }
}

export default TopicProfileContainer;