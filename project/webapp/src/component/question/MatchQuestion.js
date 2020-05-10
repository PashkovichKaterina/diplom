import React from 'react';
import "./question.css"
import ProgressPanel from "./answer/ProgressPanel";
import QuestionHeader from "./QuestionHeader";
import TopicService from "../../service/TopicService";
import MatchAnswer from "./answer/MatchAnswer";
import Util from "../../service/Util";
import ResultPopup from "../popup/ResultPopup";

class MatchQuestion extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            passedQuestionCount: 0,
            wrongAnswerCount: 0,
            firstPartList: [],
            secondPartList: []
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
                    firstPartList: json.questions.map(question => {
                        return {id: question.id, content: question.firstPart}
                    }),
                    secondPartList: json.questions.map(question => {
                        return {id: question.id, content: question.secondPart}
                    })
                }, () => {
                    Util.shuffleArray(this.state.firstPartList);
                    Util.shuffleArray(this.state.secondPartList)
                })
            );

        TopicService.getTopicsById(topicId)
            .then(response => response.json())
            .then(json => this.setState({
                topicTitle: json.title,
                courseNumber: json.courseNumber
            }));
    }

    handleFirstPartChoose = (event) => {
        const {chosenFirstPartElement, isChooseHandle} = this.state;
        if (!isChooseHandle) {
            let currentChosenElement = Number(event.target.id);
            if (chosenFirstPartElement === currentChosenElement) {
                currentChosenElement = null;
            }
            this.setState({chosenFirstPartElement: currentChosenElement}, this.checkChosenPart)
        }
    };

    handleSecondPartChoose = (event) => {
        const {chosenSecondPartElement, isChooseHandle} = this.state;
        if (!isChooseHandle) {
            let currentChosenElement = Number(event.target.id);
            if (chosenSecondPartElement === currentChosenElement) {
                currentChosenElement = null;
            }
            this.setState({chosenSecondPartElement: currentChosenElement}, this.checkChosenPart)
        }
    };

    checkChosenPart() {
        const {chosenFirstPartElement, chosenSecondPartElement, passedQuestionCount, wrongAnswerCount} = this.state;
        if (chosenFirstPartElement && chosenSecondPartElement && chosenFirstPartElement === chosenSecondPartElement) {
            this.setState({
                passedQuestionCount: passedQuestionCount + 1,
                answerStatus: true,
                isChooseHandle: true
            }, this.correctAnswerTimeout)
        } else if (chosenFirstPartElement && chosenSecondPartElement) {
            this.setState({
                wrongAnswerCount: wrongAnswerCount + 1,
                answerStatus: false,
                isChooseHandle: true
            }, this.wrongAnswerTimeout)
        }
    }

    correctAnswerTimeout = () => {
        setTimeout(this.delete, 1000);
    };

    wrongAnswerTimeout = () => {
        setTimeout(this.fun, 1000);
    };

    fun = () => {
        this.setState({
            answerStatus: null,
            chosenFirstPartElement: null,
            chosenSecondPartElement: null,
            isChooseHandle: false
        })
    };

    delete = () => {
        const {chosenFirstPartElement, chosenSecondPartElement, firstPartList, secondPartList} = this.state;
        const deletedFirstPartElement = firstPartList.filter(q => q.id === chosenFirstPartElement);
        const deletedFirstPartIndex = firstPartList.indexOf(deletedFirstPartElement[0]);
        firstPartList.splice(deletedFirstPartIndex, 1);

        const deletedSecondPartElement = secondPartList.filter(q => q.id === chosenSecondPartElement);
        const deletedSecondPartIndex = secondPartList.indexOf(deletedSecondPartElement[0]);
        secondPartList.splice(deletedSecondPartIndex, 1);
        this.setState({
            firstPartList: firstPartList,
            secondPartList: secondPartList,
            answerStatus: null,
            chosenFirstPartElement: null,
            chosenSecondPartElement: null,
            isChooseHandle: false
        });
    };

    render() {
        const {
            topicTitle, questionTitle, firstPartList, secondPartList, passedQuestionCount, questionCount,
            chosenFirstPartElement, chosenSecondPartElement, answerStatus
        } = this.state;
        const firstPartElement = firstPartList && firstPartList.map(firstPart =>
            <MatchAnswer key={firstPart.id}
                         id={firstPart.id}
                         content={firstPart.content}
                         chosenElement={chosenFirstPartElement}
                         answerStatus={answerStatus}
                         onChoose={this.handleFirstPartChoose}/>
        );
        const secondPartElement = secondPartList && secondPartList.map(secondPart =>
            <MatchAnswer key={secondPart.id}
                         id={secondPart.id}
                         content={secondPart.content}
                         answerStatus={answerStatus}
                         chosenElement={chosenSecondPartElement}
                         onChoose={this.handleSecondPartChoose}/>
        );
        return (
            <div className="container question-wrapper">
                <ResultPopup/>
                <ProgressPanel questionCount={questionCount}
                               passedQuestionCount={passedQuestionCount}/>
                <QuestionHeader topicTitle={topicTitle}
                                questionTitle={questionTitle}/>
                <div className="row">
                    <div className="col-6 m-0">
                        {firstPartElement}
                    </div>
                    <div className="col-6 m-0">
                        {secondPartElement}
                    </div>
                </div>
            </div>
        )
    }
}

export default MatchQuestion;