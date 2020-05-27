import React from 'react';
import "./admin.css";
import HeaderContainer from "../general/HeaderContainer";
import Footer from "../general/Footer";
import AdminTopicContainer from "./AdminTopicContainer";
import TopicService from "../../service/TopicService";

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
                    {topicsElement}
                </div>
                <Footer/>
            </div>
        )
    }
}

export default AdminPanel;