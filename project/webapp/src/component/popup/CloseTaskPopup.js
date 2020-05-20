import React from 'react';
import "./popup.css"

const CloseTaskPopup = (props) => {
    const {currentResult, handleCancelCloseTask, finishTask} = props;
    return (
        <div className="result-popup">
            <div className="result-popup-wrapper">
                <div className="finish-task-popup-header">Закончить задание?</div>
                <div className="finish-task-popup-message">
                    При завершении задания будет сохранен текущий результат и повторно пройти задание невозможно.
                </div>
                <div className="finish-task-popup-result">Ваш текущий результат: {currentResult}%</div>
                <button className="finish-task-popup-button" onClick={finishTask}>
                    Закончить задание
                </button>
                <button className="finish-task-popup-button" onClick={handleCancelCloseTask}>
                    Продолжить выполнение
                </button>
            </div>
        </div>
    )
};

export default CloseTaskPopup;