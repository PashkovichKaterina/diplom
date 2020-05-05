import React from 'react';
import "./task.css"
import Header from "../general/Header";
import Footer from "../general/Footer";
import TaskList from "./TaskList";

class Tasks extends React.PureComponent {
    render() {
        return (
            <div>
                <Header/>
                <div className="container mt-5 mb-5">
                    <div className="row">
                        <p className="topic-header">HEALTHY AND HAPPY</p>
                    </div>
                    <TaskList/>
                </div>
                <Footer/>
            </div>
        )
    }
}

export default Tasks;