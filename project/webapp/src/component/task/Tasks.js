import React from 'react';
import "./task.css"
import Header from "../general/Header";
import Footer from "../general/Footer";
import TopicService from "../../service/TopicService";
import Task from "./Task";

class Tasks extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            topicTitle: ""
        }
    }

    componentDidMount() {
        const topicId = this.props.match.params.id;
        TopicService.getTopicsById(topicId)
            .then(response => response.json())
            .then(json => this.setState({
                topicTitle: json.title,
                courseNumber: json.courseNumber,
                tasks: json.tasks
            }));
    }

    render() {
        const {topicTitle, tasks, courseNumber} = this.state;
        const topicId = this.props.match.params.id;
        const taskList = tasks &&
            tasks.map(task =>
                <Task key={task.id}
                      id={task.id}
                      title={task.title}
                      type={task.type}
                      topicId={topicId}
                      courseNumber={courseNumber}
                      questionCount={task.questions.length}/>
            );
        return (
            <div>
                <Header/>
                <div className="container mt-5 mb-5">
                    <p className="topic-header">{topicTitle.toUpperCase()}</p>
                    {taskList}
                </div>
                <Footer/>
            </div>
        )
    }
}

export default Tasks;