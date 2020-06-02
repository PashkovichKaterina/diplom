import React from 'react';
import "../admin.css";
import match from "../../../image/match.png";
import choose from "../../../image/choose.png";
import answer from "../../../image/answer.png";

const AddTaskPanel = (props) => {
    const {addTask} = props;
    return (
        <div>
            <div className="add-task-header">Добавить задание</div>
            <div className="row w-75 m-auto">

                <div className="col-4 m-0 text-center" onClick={addTask}>
                    <div className="add-task-icon-wrapper">
                        <img src={match} className="add-task-icon" id="match"/>
                    </div>
                    <div className="add-task-label" id="match">Соединить</div>
                </div>

                <div className="col-4 m-0 text-center" onClick={addTask}>
                    <div className="add-task-icon-wrapper">
                        <img src={choose} className="add-task-icon" id="choose"/>
                    </div>
                    <div className="add-task-label" id="choose">Выбрать из вариантов</div>
                </div>

                <div className="col-4 m-0 text-center" onClick={addTask}>
                    <div className="add-task-icon-wrapper">
                        <img src={answer} className="add-task-icon" id="answer"/>
                    </div>
                    <div className="add-task-label" id="answer">Ввести ответ</div>
                </div>

            </div>
        </div>
    )
};

export default AddTaskPanel;