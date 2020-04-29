import React from 'react';
import SearchPanel from "./search/SearchPanel";
import CourseList from "./course/CourseList";
import Footer from "../general/Footer";
import Header from "../general/Header";

class Topics extends React.PureComponent {
    render() {
        return (
            <div>
                <Header/>
                <SearchPanel/>
                <CourseList/>
                <Footer/>
            </div>
        )
    }
}

export default Topics;