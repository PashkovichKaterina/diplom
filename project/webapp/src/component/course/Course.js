import React from 'react';
import "./course.css"
import TopicContainer from "../topic/TopicContainer";

const Course = (props) => {
    const {topics, isMore, courseNumber, handleAddMoreClick} = props;
    const topicList = topics.map(topic =>
        <TopicContainer key={topic.id}
                        id={topic.id}
                        title={topic.title}
                        courseNumber={courseNumber}
                        taskCount={topic.tasks.length}
                        status={topic.status}/>
    );
    const className = `course-all-${courseNumber}`;
    const moreButton = isMore && <span className={className}
                                       course_number={courseNumber}
                                       onClick={handleAddMoreClick}>Смотреть все &#8250;</span>;
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
};

export default Course;