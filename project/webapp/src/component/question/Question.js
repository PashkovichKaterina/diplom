import React from 'react';
import "./question.css"
import TopicService from "../../service/TopicService";
import MatchQuestion from "./MatchQuestion";
import ChooseQuestion from "./ChooseQuestion";
import AnswerQuestion from "./AnswerQuestion";

class Question extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            passedQuestionCount: 0,
            correctAnswerCount: 0
        }
    }

    componentDidMount() {
        const topicId = this.props.match.params.topicId;
        const taskId = this.props.match.params.taskId;
        TopicService.getTopicTask(topicId, taskId)
            .then(response => response.json())
            .then(json => this.setState({
                questionType: json.type,
                questionTitle: json.title,
                questions: json.questions
            }));
        TopicService.getTopicsById(topicId)
            .then(response => response.json())
            .then(json => this.setState({
                topicTitle: json.title,
                courseNumber: json.courseNumber
            }));
    }

    render() {
        const {topicTitle, questionTitle, questionType} = this.state;
        const questionElement = questionType === "MATCH" ? <MatchQuestion {...this.props}/>
            : questionType === "CHOOSE" ? <ChooseQuestion {...this.props}/> : <AnswerQuestion {...this.props}/>;
        return (
            <div>
                {questionElement}
                {/*<div className="container question-wrapper">
                    <ProgressPanel/>
                    <QuestionHeader topicTitle={topicTitle}
                                    questionTitle={questionTitle}/>
                    <QuestionPanel/>
                    <GiveAnswerPanel/>
                </div>
                <ResultPanel/>*/}
            </div>
        )
    }
}

export default Question;