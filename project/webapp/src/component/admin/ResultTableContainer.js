import React from 'react';
import "./admin.css";
import HeaderContainer from "../general/HeaderContainer";
import Footer from "../general/Footer";
import ScoreService from "../../service/ScoreService";
import TopicService from "../../service/TopicService";
import RedirectLogic from "../../logic/RedirectLogic";
import ResultTableHeader from "./ResultTableHeader";
import ResultTaskList from "./ResultTaskList";
import ResultTableRow from "./ResultTableRow";

class ResultTableContainer extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount() {
        const topicId = this.props.match.params.topicId;
        TopicService.getTopicById(topicId)
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    RedirectLogic.redirectToAdminPanel();
                }
            })
            .then(json => this.setState({topic: json}))
            .then(() => ScoreService.getResultByTopic(topicId)
                .then(response => response.json())
                .then(json => this.setState({scores: json}))
            )

    }

    render() {
        const {topic, scores} = this.state;
        const rows = scores && scores.map(score => {
            return score.scores.map(s => <ResultTableRow user={score.user}
                                                         scores={s}/>)
        });
        return (
            <div>
                <HeaderContainer/>

                <div className="container">
                    <div className="table-wrapper">
                        <table className="table table-bordered table-hover mx-auto text-center">
                            <ResultTableHeader topic={topic}/>
                            <tbody>
                            {rows}
                            </tbody>
                        </table>
                    </div>
                    <ResultTaskList topic={topic}/>
                </div>

                <Footer/>
            </div>
        )
    }
}

export default ResultTableContainer;
