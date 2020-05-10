import React from 'react';
import "./topic.css"
import Util from "../../service/Util";

class Topic extends React.PureComponent {
    handleRedirectToTasks = () => {
        window.location.href = "/topics/" + this.props.id + "/tasks"
    };

    render() {
        const className = "topic-body course-" + this.props.courseNumber;
        return (
            <div className="col-lg-4 col-md-6 p-0 m-0">
                <div className="topic-wrapper" onClick={this.handleRedirectToTasks}>
                    <div className="topic-block">
                        <div className={className}>
                            <div className="topic-title">{Util.formatTopicTitle(this.props.title)}</div>
                        </div>
                        <div className="topic-footer">
                            <span>{this.props.taskCount} заданий</span>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Topic;