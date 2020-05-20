import React from 'react';
import "./question.css"
import MatchAnswer from "./answer/MatchAnswer";
import Util from "../../service/Util";
import RedirectLogic from "../../service/RedirectLogic";

class MatchQuestionContainer extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            firstPartList: props.questions.map(question => {
                return {id: question.id, content: question.firstPart}
            }),
            secondPartList: props.questions.map(question => {
                return {id: question.id, content: question.secondPart}
            })
        };
        Util.shuffleArrayByBlock(this.state.firstPartList,10);
        Util.shuffleArrayByBlock(this.state.secondPartList,10);
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
        const {chosenFirstPartElement, chosenSecondPartElement} = this.state;
        const {increaseWrongAnswerCount, increasePassedQuestionCount} = this.props;
        if (chosenFirstPartElement && chosenSecondPartElement && chosenFirstPartElement === chosenSecondPartElement) {
            increasePassedQuestionCount();
            this.setState({
                answerStatus: true,
                isChooseHandle: true
            }, this.correctAnswerTimeout)
        } else if (chosenFirstPartElement && chosenSecondPartElement) {
            increaseWrongAnswerCount();
            this.setState({
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
        const {showFinishPopup} = this.props;
        const {chosenFirstPartElement, chosenSecondPartElement, firstPartList, secondPartList} = this.state;
        const deletedFirstPartElement = firstPartList.filter(q => q.id === chosenFirstPartElement);
        const deletedFirstPartIndex = firstPartList.indexOf(deletedFirstPartElement[0]);
        firstPartList.splice(deletedFirstPartIndex, 1);

        const deletedSecondPartElement = secondPartList.filter(q => q.id === chosenSecondPartElement);
        const deletedSecondPartIndex = secondPartList.indexOf(deletedSecondPartElement[0]);
        secondPartList.splice(deletedSecondPartIndex, 1);
        if (firstPartList.length === 0) {
            showFinishPopup();
        } else {
            this.setState({
                firstPartList: firstPartList,
                secondPartList: secondPartList,
                answerStatus: null,
                chosenFirstPartElement: null,
                chosenSecondPartElement: null,
                isChooseHandle: false,
            });
        }
    };

    handleTaskFinish = () => {
        RedirectLogic.redirectToTopics();
    };

    render() {
        const {firstPartList, secondPartList, chosenFirstPartElement, chosenSecondPartElement, answerStatus} = this.state;
        const firstPartElement = [];
        for (let i = 0; i < 5 && i < firstPartList.length; i++) {
            const firstPart = firstPartList[i];
            firstPartElement.push(<MatchAnswer key={firstPart.id}
                                               id={firstPart.id}
                                               content={firstPart.content}
                                               chosenElement={chosenFirstPartElement}
                                               answerStatus={answerStatus}
                                               onChoose={this.handleFirstPartChoose}/>)
        }
        const secondPartElement = [];
        for (let i = 0; i < 5 && i < secondPartList.length; i++) {
            const secondPart = secondPartList[i];
            secondPartElement.push(<MatchAnswer key={secondPart.id}
                                                id={secondPart.id}
                                                content={secondPart.content}
                                                answerStatus={answerStatus}
                                                chosenElement={chosenSecondPartElement}
                                                onChoose={this.handleSecondPartChoose}/>);
        }
        return (
            <div className="row">
                <div className="col-6 m-0">
                    {firstPartElement}
                </div>
                <div className="col-6 m-0">
                    {secondPartElement}
                </div>
            </div>
        )
    }
}

export default MatchQuestionContainer;