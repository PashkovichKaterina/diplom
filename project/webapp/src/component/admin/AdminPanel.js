import React from 'react';
import "./admin.css";
import HeaderContainer from "../general/HeaderContainer";
import Footer from "../general/Footer";
import AdminTopicContainer from "./AdminTopicContainer";
import TopicService from "../../service/TopicService";
import RedirectLogic from "../../logic/RedirectLogic";

class AdminPanel extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount() {
        TopicService.getTopicsByCourseNumber(1)
            .then(response => response.json())
            .then(json => this.setState({topics: json}));
    }

    handleRedirectToAddTopicForm = () => {
        RedirectLogic.redirectToAddTopicForm();
    };

    render() {
        const {topics} = this.state;
        const topicsElement = topics && topics.map(topic => <AdminTopicContainer key={topic.id}
                                                                                 id={topic.id}
                                                                                 title={topic.title}
                                                                                 courseNumber={topic.courseNumber}
                                                                                 taskCount={topic.tasks.length}/>);
        return (
            <div>
                <HeaderContainer/>
                <div className="container mt-5">
                    <div className="admin-panel-block">
                        <div className="admin-panel-header">ПАНЕЛЬ УПРАВЛЕНИЯ</div>
                        <div className="admin-panel-info">
                            Здесь Вы можете создавать и редактировать темы, а также следить за результатами студентов.
                        </div>
                        <button className="admin-button" onClick={this.handleRedirectToAddTopicForm}>
                            Создать тему
                        </button>
                    </div>
                    <div className="search-block-wrapper">
                        <div className="row">
                            <div className="col-8">
                                <label className="add-topic-label d-block">Название темы</label>
                                <input className="search-admin-input"/>
                                <button className="search-admin-button">Поиск</button>
                            </div>
                            <div className="col-4">
                                <label className="add-topic-label">Курс</label>
                                <select className="course-options">
                                    <option selected disabled>Выберите курс</option>
                                    <option className="course-option">1</option>
                                    <option className="course-option">2</option>
                                    <option className="course-option">3</option>
                                    <option className="course-option">4</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    {topicsElement}
                </div>
                <Footer/>
            </div>
        )
    }
}

export default AdminPanel;