import React from 'react';
import "../question.css"

class GiveAnswerPanel extends React.PureComponent {
    render() {
        return (
            <div>
                <div className="give-answer-label">Введите ответ:</div>
                <input className="give-answer"/>
            </div>
        )
    }
}

export default GiveAnswerPanel;