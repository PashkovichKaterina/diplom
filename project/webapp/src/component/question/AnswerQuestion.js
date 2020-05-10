import React from 'react';
import "./question.css"
import ProgressPanel from "./answer/ProgressPanel";
import QuestionHeader from "./QuestionHeader";
import QuestionPanel from "./QuestionPanel";
import GiveAnswerPanel from "./answer/GiveAnswerPanel";
import ResultPanel from "./answer/ResultPanel";
import TopicService from "../../service/TopicService";

class AnswerQuestion extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            passedQuestionCount: 0,
            correctAnswerCount: 0,
            questions: [],
            answer: "",
            isAvailableButtonClick: false
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
                    questionCount: json.questions.length,
                    questions: json.questions,
                    currentQuestion: json.questions[0]
                })
            );

        TopicService.getTopicsById(topicId)
            .then(response => response.json())
            .then(json => this.setState({
                topicTitle: json.title,
                courseNumber: json.courseNumber
            }));
    }

    handleAnswerInput = (event) => {
        const {value} = event.target;
        this.setState({answer: value, isAvailableButtonClick: value.length > 0})
    };

    handleResultPanelButtonClick = (event) => {
        let {currentQuestion, answer, questions, answerStatus, passedQuestionCount, correctAnswerCount} = this.state;
        const {value} = event.target;
        if (value === "Проверить") {
            const answerStatus = currentQuestion.correctAnswer.toUpperCase() === answer.toUpperCase();
            const correctAnswer = !answerStatus && currentQuestion.correctAnswer;
            this.setState({answerStatus: answerStatus, correctAnswer: correctAnswer})
        } else {
            questions.shift();
            currentQuestion = questions.length > 0 ? questions[0] : null;
            correctAnswerCount += answerStatus ? 1 : 0;
            this.setState({
                currentQuestion: currentQuestion,
                passedQuestionCount: passedQuestionCount + 1,
                correctAnswerCount: correctAnswerCount,
                answerStatus: null,
                answer: "",
                correctAnswer: "",
                isAvailableButtonClick: false
            })
        }
    };

    render() {
        const {
            topicTitle, questionTitle, passedQuestionCount, questionCount, questions, currentQuestion, answer,
            answerStatus, isAvailableButtonClick, correctAnswer
        } = this.state;
        return (
            <div>
                <div className="container question-wrapper">
                    <ProgressPanel questionCount={questionCount}
                                   passedQuestionCount={passedQuestionCount}/>
                    <QuestionHeader topicTitle={topicTitle}
                                    questionTitle={questionTitle}/>
                    <QuestionPanel questionTitle={currentQuestion && currentQuestion.questionTitle}/>
                    <GiveAnswerPanel value={answer}
                                     onChange={this.handleAnswerInput}/>
                </div>
                <ResultPanel answerStatus={answerStatus}
                             correctAnswer={correctAnswer}
                             isAvailableButtonClick={isAvailableButtonClick}
                             buttonClick={this.handleResultPanelButtonClick}/>
            </div>
        )
    }
}

export default AnswerQuestion;