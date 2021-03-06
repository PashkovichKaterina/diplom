import React from 'react';
import "../question.css"

class MatchAnswer extends React.PureComponent {
    render() {
        const {content, id, onChoose, chosenElement, answerStatus} = this.props;
        let className = "answer";
        if (chosenElement === id) {
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
            <div className="col-6 position-relative h-auto">
                <div className={className} id={id} onClick={onChoose} dangerouslySetInnerHTML={{__html: content}}>
                </div>
            </div>
        )
    }
}

export default MatchAnswer;