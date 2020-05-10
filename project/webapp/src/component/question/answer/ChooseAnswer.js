import React from 'react';
import "../question.css"

class ChooseAnswer extends React.PureComponent {
    render() {
        const {content, id, onChoose, chosenElements, answerStatus} = this.props;
        let className = "answer";
        if (chosenElements.includes(id)) {
            switch (answerStatus) {
                case undefined:
                case null:
                    className = "chosen-answer";
                    break;
                case true:
                    className = "correct-answer";
                    break;
                case false:
                    className = "wrong-answer";
                    break;
            }
        }
        return (
            <div className="col-12 p-0 align-self-center text-center">
                <div className={className} id={id} onClick={onChoose}>
                    {content}
                </div>
            </div>
        )
    }
}

export default ChooseAnswer;