import React from 'react';
import "../admin.css";
import AddMatchElement from "./AddMatchElement";
import AddAnswerElement from "./AddAnswerElement";
import AddChooseElement from "./AddChooseElement";
import AddTaskPanel from "./AddTaskPanel";
import TopicService from "../../../service/TopicService";
import RedirectLogic from "../../../logic/RedirectLogic";

class AddTopicFormContainer extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            tasks: []
        };
    }

    handleSubmitForm = (event) => {
        event.preventDefault();
        const {topicTitle, courseNumber, tasks} = this.state;
        const topic = {title: topicTitle, courseNumber: courseNumber, tasks: tasks};
        TopicService.createTopic(topic);
        RedirectLogic.redirectToAdminPanel();
    };

    handleCancelClick = () => {
        RedirectLogic.redirectToAdminPanel();
    };

    addTask = (event) => {
        const {tasks} = this.state;
        const taskType = event.target.id;
        if (taskType) {
            const taskId = tasks.length + 1;
            const questions = [{id: 1, type: taskType.toLowerCase()}, {id: 2, type: taskType.toLowerCase()}];
            if (taskType.toLowerCase() === "choose") {
                questions.map(question => question.answers = [{id: 1, status: false}, {id: 2, status: false}])
            }
            const task = {id: taskId, type: taskType.toUpperCase(), questions: questions};
            this.setState(state => ({tasks: [...state.tasks, task]}))
        }
    };

    deleteTask = (event) => {
        const target = event.target.tagName === "svg" ? event.target : event.target.parentNode;
        const taskNumber = target.getAttribute("task_number");
        const {tasks} = this.state;
        let newTasks = tasks.slice();
        newTasks.splice(taskNumber - 1, 1);
        this.setState({tasks: newTasks});
    };

    addQuestionInTask = (event) => {
        const {tasks} = this.state;
        const {id} = event.target;
        let newTasks = tasks.slice();
        const question = {id: newTasks[id - 1].questions.length + 1, type: newTasks[id - 1].type.toLowerCase()};
        if (newTasks[id - 1].type.toLowerCase() === "choose") {
            question.answers = [{id: 1, status: false}, {id: 2, status: false}];
        }
        newTasks[id - 1].questions.push(question);
        this.setState({tasks: newTasks});
    };

    deleteQuestionInTask = (event) => {
        const target = event.target.tagName === "svg" ? event.target : event.target.parentNode;
        const taskNumber = target.getAttribute("task_number");
        const questionNumber = target.getAttribute("question_number");

        const {tasks} = this.state;
        let newTasks = tasks.slice();
        newTasks[taskNumber - 1].questions.splice(questionNumber - 1, 1);
        this.setState({tasks: newTasks});
    };

    addOptionInQuestion = (event) => {
        const taskNumber = event.target.getAttribute("task_number");
        const questionNumber = event.target.getAttribute("question_number");

        const {tasks} = this.state;
        let newTasks = tasks.slice();
        const answers = newTasks[taskNumber - 1].questions[questionNumber - 1].answers;
        answers.push({id: answers.length + 1, status: false});
        this.setState({tasks: newTasks});
    };

    deleteOptionInQuestion = (event) => {
        const target = event.target.tagName === "svg" ? event.target : event.target.parentNode;
        const taskNumber = target.getAttribute("task_number");
        const questionNumber = target.getAttribute("question_number");
        const optionNumber = target.getAttribute("option_number");

        const {tasks} = this.state;
        let newTasks = tasks.slice();
        newTasks[taskNumber - 1].questions[questionNumber - 1].answers.splice(optionNumber - 1, 1);
        this.setState({tasks: newTasks});
    };

    getQuestionComponent(task, taskNumber) {
        let questionComponent;
        switch (task.type.toLowerCase()) {
            case "match":
                questionComponent = <AddMatchElement key={task.id}
                                                     title={task.title}
                                                     taskNumber={taskNumber}
                                                     questions={task.questions}
                                                     addQuestionInTask={this.addQuestionInTask}
                                                     onChangeInputElement={this.onChangeInputElement}
                                                     deleteTask={this.deleteTask}
                                                     deleteQuestionInTask={this.deleteQuestionInTask}/>;
                break;
            case "choose":
                questionComponent = <AddChooseElement key={task.id}
                                                      title={task.title}
                                                      taskNumber={taskNumber}
                                                      questions={task.questions}
                                                      addQuestionInTask={this.addQuestionInTask}
                                                      onChangeInputElement={this.onChangeInputElement}
                                                      deleteTask={this.deleteTask}
                                                      deleteQuestionInTask={this.deleteQuestionInTask}
                                                      addOptionInQuestion={this.addOptionInQuestion}
                                                      deleteOptionInQuestion={this.deleteOptionInQuestion}/>;
                break;
            case "answer":
                questionComponent = <AddAnswerElement key={task.id}
                                                      title={task.title}
                                                      taskNumber={taskNumber}
                                                      questions={task.questions}
                                                      addQuestionInTask={this.addQuestionInTask}
                                                      onChangeInputElement={this.onChangeInputElement}
                                                      deleteTask={this.deleteTask}
                                                      deleteQuestionInTask={this.deleteQuestionInTask}/>;
                break;
        }
        return questionComponent;
    }

    onChangeInputElement = (event) => {
        const {tasks} = this.state;
        const {name, value, checked} = event.target;
        const taskNumber = event.target.getAttribute("task_number");
        const questionNumber = event.target.getAttribute("question_number");
        const optionNumber = event.target.getAttribute("option_number");
        const newTasks = tasks.slice();
        switch (name) {
            case "topicTitle":
                this.setState({topicTitle: value});
                break;
            case "courseNumber":
                this.setState({courseNumber: value});
                break;
            case "title":
                newTasks[taskNumber - 1][name] = value;
                break;
            case "optionTitle":
                newTasks[taskNumber - 1].questions[questionNumber - 1].answers[optionNumber - 1].title = value;
                break;
            case "status":
                newTasks[taskNumber - 1].questions[questionNumber - 1].answers[optionNumber - 1][name] = checked;
                break;
            default:
                newTasks[taskNumber - 1].questions[questionNumber - 1][name] = value;
                break;
        }
        this.setState({tasks: newTasks});
    };

    render() {
        const {tasks, topicTitle} = this.state;
        console.log(this.state);
        let i = 1;
        const tasksElement = tasks && tasks.map(task => this.getQuestionComponent(task, i++));
        return (
            <main>
                <form onSubmit={this.handleSubmitForm}>
                    <div className="add-topic-header">Создание новой темы</div>
                    <div className="container">
                        <div className="add-topic-main-information-wrapper">
                            <div className="add-task-block">
                                <div className="add-topic-block-header">Базовая информация</div>
                                <div className="row add-topic-main-information-wrapper">
                                    <div className="col-8">
                                        <label className="add-topic-label">Название</label>
                                        <input className="add-topic-input"
                                               name="topicTitle"
                                               value={topicTitle}
                                               onChange={this.onChangeInputElement}/>
                                    </div>
                                    <div className="col-4">
                                        <label className="add-topic-label">Курс</label>
                                        <select className="course-options"
                                                name="courseNumber"
                                                defaultValue={"DEFAULT"}
                                                onChange={this.onChangeInputElement}>
                                            <option value="DEFAULT" disabled>Выберите курс</option>
                                            <option className="course-option">1</option>
                                            <option className="course-option">2</option>
                                            <option className="course-option">3</option>
                                            <option className="course-option">4</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            {tasksElement}

                            <AddTaskPanel addTask={this.addTask}/>

                        </div>
                        <div className="button-block">
                            <button className="add-topic-button add-topic-button-active" type="submit">Сохранить
                            </button>
                            <button className="add-topic-button" onClick={this.handleCancelClick}>Отмена</button>
                        </div>
                    </div>
                </form>
            </main>
        )
    }
}

export default AddTopicFormContainer;