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
        const {increasePassedQuestionCount, increaseCorrectAnswerCount, showFinishPopup} = this.props;
        const {currentQuestion, answer, questions, answerStatus, isAnswerChecked} = this.state;
        if (!isAnswerChecked) {
            const answerStatus = ResultLogic.isValidPrintedAnswer(answer, currentQuestion.correctAnswer);
            const correctAnswer = !answerStatus && currentQuestion.correctAnswer;
            increasePassedQuestionCount();
            if (answerStatus) {
                increaseCorrectAnswerCount();
            }
            this.setState({
                answerStatus: answerStatus,
                correctAnswer: correctAnswer,
                isAnswerChecked: true
            })
        } else {
            questions.shift();
            if (questions.length === 0) {
                showFinishPopup();
            } else {
                this.setState({
                    currentQuestion: questions[0],
                    answerStatus: null,
                    answer: "",
                    correctAnswer: "",
                    isAvailableButtonClick: false,
                    isAnswerChecked: false
                })
            }
        }
    };

    render() {
        const {currentQuestion, answer, answerStatus, isAvailableButtonClick, correctAnswer} = this.state;
        const {courseNumber} = this.props;
        return (
            <div>
                <QuestionPanel questionTitle={currentQuestion.questionTitle}
                               courseNumber={courseNumber}/>
                <GiveAnswerPanel value={answer}
                                 onChange={this.handleAnswerInput}/>
                <ResultPanel answerStatus={answerStatus}
                             correctAnswer={correctAnswer}
                             courseNumber={courseNumber}
                             isAvailableButtonClick={isAvailableButtonClick}
                             buttonClick={this.handleResultPanelButtonClick}/>
            </div>
        )
    }
}

export default AnswerQuestionContainer;