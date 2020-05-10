import React from 'react';
import "./question.css"
import ProgressPanel from "./answer/ProgressPanel";
import QuestionHeader from "./QuestionHeader";
import QuestionPanel from "./QuestionPanel";
import ResultPanel from "./answer/ResultPanel";
import TopicService from "../../service/TopicService";
import ChooseAnswer from "./answer/ChooseAnswer";

class ChooseQuestion extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            passedQuestionCount: 0,
            correctAnswerCount: 0,
            questions: [],
            isAvailableButtonClick: false,
            chosenElements: []
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

    handleAnswerChoose = (event) => {
        const {chosenElements} = this.state;
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
    };

    handleResultPanelButtonClick = (event) => {
        let {currentQuestion, answer, questions, answerStatus, passedQuestionCount, correctAnswerCount, chosenElements} = this.state;
        const {value} = event.target;
        if (value === "Проверить") {
            const correctAnswers = currentQuestion.answers
                .filter(answer => answer.status)
                .map(answer => answer.id);
            const answerStatus = chosenElements.length === correctAnswers.length
                && chosenElements.filter(element => !correctAnswers.includes(element)).length === 0;
            const correctAnswer = !answerStatus &&
                currentQuestion.answers
                    .filter(answer => answer.status)
                    .map(answer => answer.title)
                    .join(", ");
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
                correctAnswer: "",
                chosenElements: [],
                isAvailableButtonClick: false
            })
        }
    };

    render() {
        const {
            topicTitle, questionTitle, passedQuestionCount, questionCount, chosenElements, currentQuestion, answer,
            answerStatus, isAvailableButtonClick, correctAnswer
        } = this.state;
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
                <div className="container question-wrapper">
                    <ProgressPanel questionCount={questionCount}
                                   passedQuestionCount={passedQuestionCount}/>
                    <QuestionHeader topicTitle={topicTitle}
                                    questionTitle={questionTitle}/>
                    <QuestionPanel questionTitle={currentQuestion && currentQuestion.questionTitle}/>
                    <div className="row">
                        {optionsElement}
                    </div>
                </div>
                <ResultPanel answerStatus={answerStatus}
                             correctAnswer={correctAnswer}
                             isAvailableButtonClick={chosenElements.length > 0}
                             buttonClick={this.handleResultPanelButtonClick}/>
            </div>
        )
    }
}

export default ChooseQuestion;