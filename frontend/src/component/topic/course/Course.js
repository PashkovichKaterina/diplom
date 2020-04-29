import React from 'react';
import TopicList from "../TopicList";
import "./course.css"

class Course extends React.PureComponent {
    render() {
        return (
            <div className="course-wrapper">
                <div className="course-header">
                    <span className="course-number">1 КУРС</span>
                    <span className="course-all">Смотреть все &#8250;</span>
                </div>
                <TopicList/>
            </div>
        )
    }
}

export default Course;