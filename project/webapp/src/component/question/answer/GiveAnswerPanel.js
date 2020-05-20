import React from 'react';
import "../question.css"

class GiveAnswerPanel extends React.PureComponent {
    render() {
        const {value,onChange} = this.props;
        return (
            <div className="answer-block">
                <div className="give-answer-label">Введите ответ:</div>
                <input className="give-answer" value={value} onChange={onChange}/>
            </div>
        )
    }
}

export default GiveAnswerPanel;