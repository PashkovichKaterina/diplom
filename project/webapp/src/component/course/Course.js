import React from 'react';
import "./course.css"
import Topic from "../topic/Topic";

class Course extends React.PureComponent {
    constructor(props) {
        super(props);
    }

    render() {
        const {topics, isMore, courseNumber} = this.props;
        const topicList = topics.map(topic =>
            <Topic key={topic.id}
                   id={topic.id}
                   title={topic.title}
                   courseNumber={courseNumber}
                   taskCount={topic.tasks.length}/>
        );
        const className = `course-all-${courseNumber}`;
        const moreButton = isMore && <span className={className}>Смотреть все &#8250;</span>;
        return (
            <div className="container">
                <div className="course-wrapper">
                    <div className="course-header">
                        <span className="course-number">{courseNumber} КУРС</span>
                        {moreButton}
                    </div>
                    <div className="row">
                        {topicList}
                    </div>
                </div>
            </div>
        )
    }
}

export default Course;