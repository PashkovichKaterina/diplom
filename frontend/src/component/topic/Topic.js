import React from 'react';
import "./topic.css"

class Topic extends React.PureComponent {
    render() {
        return (
            <div className="col-lg-4 col-md-6 p-0 m-0">
                <div className="topic-wrapper">
                    <div className="topic-block">
                        <div className="topic-body course-1">
                            <div className="topic-title">WORKLOAD</div>
                        </div>
                        <div className="topic-footer">
                            <span>9 заданий</span>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Topic;