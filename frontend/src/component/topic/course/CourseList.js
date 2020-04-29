import React from 'react';
import Course from "./Course";

class CourseList extends React.PureComponent {
    render() {
        return (
            <div className="container p-0">
                <Course/>
                <Course/>
            </div>
        )
    }
}

export default CourseList;