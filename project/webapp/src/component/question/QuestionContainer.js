import React from 'react';
import "./question.css"
import TopicService from "../../service/TopicService";
import MatchQuestionContainer from "./MatchQuestionContainer";
import ChooseQuestionContainer from "./ChooseQuestionContainer";
import AnswerQuestionContainer from "./AnswerQuestionContainer";
import InformPopup from "../popup/InformPopup";
import ProgressPanel from "./answer/ProgressPanel";
import QuestionHeader from "./QuestionHeader";
import FinishTaskPopup from "../popup/FinishTaskPopup";
import ResultLogic from "../../service/ResultLogic";
import RedirectLogic from "../../service/RedirectLogic";
import ScoreService from "../../service/ScoreService";

class QuestionContainer extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            passedQuestionCount: 0,
            correctAnswerCount: 0,
            wrongAnswerCount: 0
        }
    }

    componentDidMount() {
        const topicId = this.props.match.params.topicId;
        const taskId = this.props.match.params.taskId;
        TopicService.getTopicTask(topicId, taskId)
            .then(response => response.json())
            .then(json => this.setState({
                questionType: json.type,
                questionStatus: json.status,
                questionTitle: json.title,
                questionCount: json.questions.length,
                questions: json.questions,
            }, () => this.setQuestionContent()));

        TopicService.getTopicsById(topicId)
            .then(response => response.json())
            .then(json => this.setState({
                topicTitle: json.title,
                courseNumber: json.courseNumber
            }));
    }

    setQuestionContent() {
        const {questionStatus} = this.state;
        const questionContent = questionStatus !== "pending"
            ? this.getPopup()
            : this.getQuestionElement();
        this.setState({questionContent: questionContent});
    }

    getPopup() {
        return <InformPopup status="scd"/>
    }

    getQuestionElement() {
        const {questionType, questions} = this.state;
        let questionElement;
        switch (questionType) {
            case "MATCH":
                questionElement = <MatchQuestionContainer {...this.props}
                                                          questions={questions}
                                                          increaseWrongAnswerCount={this.increaseWrongAnswerCount}
                                                          increasePassedQuestionCount={this.increasePassedQuestionCount}/>;
                break;
            case "CHOOSE":
                questionElement = <ChooseQuestionContainer {...this.props}
                                                           questions={questions}
                                                           increaseCorrectAnswerCount={this.increaseCorrectAnswerCount}
                                                           increasePassedQuestionCount={this.increasePassedQuestionCount}/>;
                break;
            case "ANSWER":
                questionElement = <AnswerQuestionContainer {...this.props}
                                                           questions={questions}
                                                           increaseCorrectAnswerCount={this.increaseCorrectAnswerCount}
                                                           increasePassedQuestionCount={this.increasePassedQuestionCount}/>;
                break;
        }
        return questionElement;
    }

    increasePassedQuestionCount = () => {
        this.setState(state => {
            return {passedQuestionCount: state.passedQuestionCount + 1}
        });
    };

    increaseCorrectAnswerCount = () => {
        this.setState(state => {
            return {correctAnswerCount: state.correctAnswerCount + 1}
        });
    };

    increaseWrongAnswerCount = () => {
        this.setState(state => {
            return {wrongAnswerCount: state.wrongAnswerCount + 1}
        });
    };

    handleCloseTask = () => {
        this.setState({isShowFinishTaskPopup: true})
    };

    handleCancelCloseTask = () => {
        this.setState({isShowFinishTaskPopup: false})
    };

    finishTask = () => {
        const topicId = Number(this.props.match.params.topicId);
        const taskId = Number(this.props.match.params.taskId);
        const value = Number(this.getCurrentResult());
        ScoreService.saveUserResult(topicId, taskId, value);
        RedirectLogic.redirectToTopic(topicId);
    };

    getCurrentResult() {
        const {questionCount, wrongAnswerCount, correctAnswerCount} = this.state;
        return wrongAnswerCount
            ? ResultLogic.calculateResultOfWrongAnswer(wrongAnswerCount, questionCount)
            : ResultLogic.calculateResultOfCorrectAnswer(correctAnswerCount, questionCount)
    }

    render() {
        const {
            questionContent, questionCount, passedQuestionCount, topicTitle, questionTitle, questionType,
            isShowFinishTaskPopup, correctAnswerCount, wrongAnswerCount
        } = this.state;
        const finishPopup = isShowFinishTaskPopup &&
            <FinishTaskPopup handleCancelCloseTask={this.handleCancelCloseTask}
                             currentResult={this.getCurrentResult()}
                             handleCancelCloseTask={this.handleCancelCloseTask}
                             finishTask={this.finishTask}/>;
        return (
            <div>
                {finishPopup}
                <div className="container question-wrapper">
                    <ProgressPanel questionCount={questionCount}
                                   passedQuestionCount={passedQuestionCount}
                                   handleCloseTask={this.handleCloseTask}/>
                    <QuestionHeader topicTitle={topicTitle}
                                    questionTitle={questionTitle}
                                    questionType={questionType}/>
                    {questionContent}
                </div>
            </div>
        )
    }
}

export default QuestionContainer;