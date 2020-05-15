import React from 'react';
import "./question.css"
import QuestionPanel from "./QuestionPanel";
import ResultPanel from "./answer/ResultPanel";
import ChooseAnswer from "./answer/ChooseAnswer";
import ResultLogic from "../../service/ResultLogic";

class ChooseQuestionContainer extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            questions: props.questions,
            currentQuestion: props.questions[0],
            chosenElements: [],
            isAvailableButtonClick: false,
            isAnswerChecked: false
        }
    }

    handleAnswerChoose = (event) => {
        const {chosenElements, isAnswerChecked} = this.state;
        if (!isAnswerChecked) {
            const currentChosenElement = Number(event.target.id);
            if (chosenElements.includes(currentChosenElement)) {
                this.setState(prevState => ({
                    chosenElements: prevState.chosenElements.filter(item => item !== currentChosenElement)
                }))
            } else {
                this.setState(prevState => ({
                    chosenElements: [...prevState.chosenElements, currentChosenElement]
                }))
            }
        }
    };

    handleResultPanelButtonClick = () => {
        const {increasePassedQuestionCount, increaseCorrectAnswerCount} = this.props;
        const {currentQuestion, questions, chosenElements, isAnswerChecked} = this.state;
        if (!isAnswerChecked) {
            const correctAnswers = currentQuestion.answers
                .filter(answer => answer.status);
            const answerStatus = ResultLogic.isValidChosenAnswer(chosenElements, correctAnswers.map(answer => answer.id));
            const correctAnswer = !answerStatus &&
                correctAnswers
                    .map(answer => answer.title)
                    .join(", ");
            this.setState({
                answerStatus: answerStatus,
                correctAnswer: correctAnswer,
                isAnswerChecked: true
            })
        } else {
            questions.shift();
            increasePassedQuestionCount();
            increaseCorrectAnswerCount();
            this.setState({
                currentQuestion: questions.length > 0 ? questions[0] : null,
                answerStatus: null,
                correctAnswer: "",
                chosenElements: [],
                isAvailableButtonClick: false,
                isAnswerChecked: false
            })
        }
    };

    render() {
        const {chosenElements, currentQuestion, answerStatus, correctAnswer} = this.state;
        const optionsElement = currentQuestion && currentQuestion.answers.map(answer =>
            <ChooseAnswer key={answer.id}
                          id={answer.id}
                          content={answer.title}
                          chosenElements={chosenElements}
                          answerStatus={answerStatus}
                          onChoose={this.handleAnswerChoose}/>
        );
        return (
            <div>
                <QuestionPanel questionTitle={currentQuestion.questionTitle}/>
                <div className="row">
                    {optionsElement}
                </div>
                <ResultPanel answerStatus={answerStatus}
                             correctAnswer={correctAnswer}
                             isAvailableButtonClick={chosenElements.length > 0}
                             buttonClick={this.handleResultPanelButtonClick}/>
            </div>
        )
    }
}

export default ChooseQuestionContainer;