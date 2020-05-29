import React from 'react';
import "./topic.css"
import "../../color.css"
import Util from "../../logic/Util";
import {faClock} from "@fortawesome/free-solid-svg-icons";
import {faCheckCircle} from "@fortawesome/free-solid-svg-icons";
import {faMinusCircle} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

class TopicContainer extends React.PureComponent {
    handleRedirectToTasks = () => {
        window.location.href = "/topics/" + this.props.id + "/tasks"
    };

    render() {
        const {courseNumber, title, taskCount, status} = this.props;
        let statusIcon;
        switch (status) {
            case "pending":
                statusIcon = <FontAwesomeIcon icon={faMinusCircle}
                                              className="pending-status-color"
                                              title="Не начато"/>;
                break;
            case "in progress":
                statusIcon = <FontAwesomeIcon icon={faClock}
                                              className="progress-status-color"
                                              title="В процессе"/>;
                break;
            case "completed":
                statusIcon = <FontAwesomeIcon icon={faCheckCircle}
                                              className="complete-status-color"
                                              title="Завершено"/>;
                break;
        }
        return (
            <div className="col-lg-4 col-md-6 p-0 m-0">
                <div className="topic-wrapper" onClick={this.handleRedirectToTasks}>
                    <div className="topic-block">
                        <div className={`topic-body course-${courseNumber}`}>
                            <div className="topic-title">{Util.formatTopicTitle(title)}</div>
                        </div>
                        <div className="topic-footer">
                            <span>{taskCount} {Util.getTaskDeclension(taskCount)}</span>
                            <span className="status-icon">{statusIcon}</span>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default TopicContainer;