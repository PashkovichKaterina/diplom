import React from 'react';
import "./question.css"
import QuestionPanel from "./QuestionPanel";
import GiveAnswerPanel from "./answer/GiveAnswerPanel";
import ResultPanel from "./answer/ResultPanel";
import ResultLogic from "../../service/ResultLogic";

class AnswerQuestionContainer extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            questions: props.questions,
            currentQuestion: props.questions[0],
            answer: "",
            isAvailableButtonClick: false,
            isAnswerChecked: false
        }
    }

    handleAnswerInput = (event) => {
        const {isAnswerChecked} = this.state;
        if (!isAnswerChecked) {
            const {value} = event.target;
            this.setState({answer: value, isAvailableButtonClick: value.length > 0})
        }
    };

    handleResultPanelButtonClick = () => {
        const {increasePassedQuestionCount, increaseCorrectAnswerCount} = this.props;
        const {currentQuestion, answer, questions, answerStatus, isAnswerChecked} = this.state;
        if (!isAnswerChecked) {
            const answerStatus = ResultLogic.isValidPrintedAnswer(answer, currentQuestion.correctAnswer);
            const correctAnswer = !answerStatus && currentQuestion.correctAnswer;
            this.setState({
                answerStatus: answerStatus,
                correctAnswer: correctAnswer,
                isAnswerChecked: true
            })
        } else {
            questions.shift();
            increasePassedQuestionCount();
            if (answerStatus) {
                increaseCorrectAnswerCount();
            }
            this.setState({
                currentQuestion: questions.length > 0 ? questions[0] : null,
                answerStatus: null,
                answer: "",
                correctAnswer: "",
                isAvailableButtonClick: false,
                isAnswerChecked: false
            })
        }
    };

    render() {
        const {currentQuestion, answer, answerStatus, isAvailableButtonClick, correctAnswer} = this.state;
        return (
            <div>
                <QuestionPanel questionTitle={currentQuestion.questionTitle}/>
                <GiveAnswerPanel value={answer}
                                 onChange={this.handleAnswerInput}/>
                <ResultPanel answerStatus={answerStatus}
                             correctAnswer={correctAnswer}
                             isAvailableButtonClick={isAvailableButtonClick}
                             buttonClick={this.handleResultPanelButtonClick}/>
            </div>
        )
    }
}

export default AnswerQuestionContainer;