import React from 'react';
import "./popup.css"

class ResultPopup extends React.PureComponent {
    render() {
        return (
            <div className="result-popup">
                <div className="result-popup-wrapper">
                    <div className="result-popup-task-title">TASK TITLE</div>
                    <div className="result-popup-topic-title">Topic title</div>
                    <div>Количество вопросов: 40</div>
                    <div>Количество ошибок: 10</div>
                    <div>Результат: 70%</div>
                    <button>Продолжить</button>
                </div>
            </div>
        )
    }
}

export default ResultPopup;