import React from 'react';
import "./question.css"
import TopicService from "../../service/TopicService";
import MatchQuestionContainer from "./MatchQuestionContainer";
import ChooseQuestionContainer from "./ChooseQuestionContainer";
import AnswerQuestionContainer from "./AnswerQuestionContainer";
import ProgressPanel from "./answer/ProgressPanel";
import QuestionHeader from "./QuestionHeader";
import CloseTaskPopup from "../popup/CloseTaskPopup";
import ResultLogic from "../../logic/ResultLogic";
import RedirectLogic from "../../logic/RedirectLogic";

import ResultPopup from "../popup/ResultPopup";
import AuthorizationLogic from "../../logic/AuthorizationLogic";
import EmptyDataPopup from "../popup/EmptyDataPopup";
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
        if (AuthorizationLogic.isStudentDataFill()) {
            const topicId = this.props.match.params.topicId;
            const taskId = this.props.match.params.taskId;
            TopicService.getTopicById(topicId)
                .then(response => {
                    if (response.ok) {
                        return response.json()
                    } else {
                        RedirectLogic.redirectToTopics();
                    }
                })
                .then(json => {
                    if (json) {
                        this.setState({
                            topicTitle: json.title,
                            courseNumber: json.courseNumber,
                        });
                        return json.tasks;
                    }
                })
                .then(tasks => {
                    if (tasks) {
                        const currentTask = tasks.filter(task => task.id == taskId);
                        this.setState({
                            questionType: currentTask[0].type,
                            questionTitle: currentTask[0].title,
                            questionCount: currentTask[0].questions.length,
                            questions: currentTask[0].questions
                        });
                        window.addEventListener('beforeunload', this.handleLeavePage);
                        window.addEventListener('unload', this.finishTask);
                    }
                });
        } else {
            this.setState({isShowEmptyDataPopup: true});
        }
    }

    handleCloseEmptyDataPopup = () => {
        const topicId = this.props.match.params.topicId;
        RedirectLogic.redirectToTopic(topicId);
    };

    handleLeavePage(event) {
        const confirmationMessage = 'Some message';
        event.returnValue = confirmationMessage;
        return confirmationMessage;
    }

    getQuestionElement() {
        const {questionType, questions, courseNumber} = this.state;
        let questionElement;
        switch (questionType) {
            case "MATCH":
                questionElement = <MatchQuestionContainer {...this.props}
                                                          questions={questions}
                                                          showFinishPopup={this.showFinishPopup}
                                                          increaseCorrectAnswerCount={this.increaseCorrectAnswerCount}
                                                          increaseWrongAnswerCount={this.increaseWrongAnswerCount}
                                                          increasePassedQuestionCount={this.increasePassedQuestionCount}/>;
                break;
            case "CHOOSE":
                questionElement = <ChooseQuestionContainer {...this.props}
                                                           questions={questions}
                                                           courseNumber={courseNumber}
                                                           showFinishPopup={this.showFinishPopup}
                                                           increaseCorrectAnswerCount={this.increaseCorrectAnswerCount}
                                                           increasePassedQuestionCount={this.increasePassedQuestionCount}/>;
                break;
            case "ANSWER":
                questionElement = <AnswerQuestionContainer {...this.props}
                                                           questions={questions}
                                                           courseNumber={courseNumber}
                                                           showFinishPopup={this.showFinishPopup}
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
        this.setState({isShowCloseTaskPopup: true})
    };

    handleCancelCloseTask = () => {
        this.setState({isShowCloseTaskPopup: false})
    };

    handleProfileRedirect = () => {
        RedirectLogic.redirectToUserProfile();
    };

    finishTask = () => {
        window.removeEventListener('beforeunload', this.handleLeavePage);
        const topicId = Number(this.props.match.params.topicId);
        const taskId = Number(this.props.match.params.taskId);
        const value = Number(this.getCurrentResult());
        ScoreService.saveUserResult(topicId, taskId, value);
        RedirectLogic.redirectToTopic(topicId);
    };

    getCurrentResult() {
        const {questionCount, wrongAnswerCount, correctAnswerCount} = this.state;
        return ResultLogic.calculateResult(correctAnswerCount, wrongAnswerCount, questionCount)
    }

    showFinishPopup = () => {
        this.setState({isShowFinishTaskPopup: true});
    };

    render() {
        let {
            questionCount, passedQuestionCount, topicTitle, questionTitle, questionType, courseNumber,
            isShowFinishTaskPopup, isShowCloseTaskPopup, wrongAnswerCount, correctAnswerCount, isShowEmptyDataPopup
        } = this.state;
        const emptyDataPopup = isShowEmptyDataPopup &&
            <EmptyDataPopup handleFillInForm={this.handleProfileRedirect}
                            handleSkipClick={this.handleCloseEmptyDataPopup}/>;

        const closePopup = isShowCloseTaskPopup &&
            <CloseTaskPopup handleCancelCloseTask={this.handleCancelCloseTask}
                            currentResult={this.getCurrentResult()}
                            finishTask={this.finishTask}/>;
        const finishPopup = isShowFinishTaskPopup &&
            <ResultPopup topicTitle={topicTitle}
                         questionTitle={questionTitle}
                         questionCount={questionCount}
                         courseNumber={courseNumber}
                         questionType={questionType}
                         wrongAnswerCount={wrongAnswerCount}
                         correctAnswerCount={correctAnswerCount}
                         handleTaskFinish={this.finishTask}/>;
        const progressPanel = this.getQuestionElement() &&
            <ProgressPanel questionCount={questionCount}
                           passedQuestionCount={passedQuestionCount}
                           handleCloseTask={this.handleCloseTask}/>;
        const questionHeader = this.getQuestionElement() &&
            <QuestionHeader topicTitle={topicTitle}
                            questionTitle={questionTitle}
                            questionType={questionType}/>;
        return (
            <div>
                {emptyDataPopup}
                {closePopup}
                {finishPopup}
                <div className="container question-wrapper">
                    {progressPanel}
                    {questionHeader}
                    {this.getQuestionElement()}
                </div>
            </div>
        )
    }
}

export default QuestionContainer;