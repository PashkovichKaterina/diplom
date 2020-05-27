import React from 'react';
import "./task.css"
import HeaderContainer from "../general/HeaderContainer";
import Footer from "../general/Footer";
import TopicService from "../../service/TopicService";
import TaskContainer from "./TaskContainer";

class TasksContainer extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            topicTitle: ""
        }
    }

    componentDidMount() {
        const topicId = this.props.match.params.id;
        TopicService.getTopicById(topicId)
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
                <TaskContainer key={task.id}
                               id={task.id}
                               title={task.title}
                               type={task.type}
                               topicId={topicId}
                               courseNumber={courseNumber}
                               questionCount={task.questions.length}
                               lastValue={task.lastValue}/>
            );
        return (
            <div>
                <HeaderContainer/>
                <div className="container mt-5 mb-5">
                    <p className="topic-header">{topicTitle&&topicTitle.toUpperCase()}</p>
                    {taskList}
                </div>
                <Footer/>
            </div>
        )
    }
}

export default TasksContainer;