import React from 'react';
import "./admin.css";
import match from "../../image/match.png";
import choose from "../../image/choose.png";
import answer from "../../image/answer.png";

class AddTopicFormContainer extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <main>
                <div className="add-topic-header">Создание новой темы</div>
                <div className="container">
                    <div className="add-topic-main-information-wrapper">
                        <div className="add-topic-main-information">
                            <div className="add-topic-block-header">Базовая информация</div>
                            <div className="row">
                                <div className="col-8">
                                    <label className="add-topic-label">Название</label>
                                    <input className="add-topic-input"/>
                                </div>
                                <div className="col-4">
                                    <label className="add-topic-label">Курс</label>
                                    <select className="course-options">
                                        <option selected disabled>Выберите курс</option>
                                        <option className="course-option">1</option>
                                        <option className="course-option">1</option>
                                        <option className="course-option">1</option>
                                        <option className="course-option">1</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="add-task-block">
                            <div className="add-topic-block-header">Задание 1</div>
                            <label className="add-topic-label">Заголовок</label>
                            <input className="add-topic-input"/>
                            <label className="add-topic-label mt-5">Вопросы</label>
                            <div className="row">
                                <div className="col-2"></div>
                                <div className="col-5">
                                    Первая часть
                                </div>
                                <div className="col-5">
                                    Вторая часть
                                </div>
                            </div>
                            <div className="row add-topic-question-block">
                                <div className="col-2 question-number">
                                    1
                                </div>
                                <div className="col-5">
                                    <input className="add-topic-input"/>
                                </div>
                                <div className="col-5">
                                    <input className="add-topic-input"/>
                                </div>
                            </div>
                            <div className="row add-topic-question-block">
                                <div className="col-2 question-number">
                                    2
                                </div>
                                <div className="col-5">
                                    <input className="add-topic-input"/>
                                </div>
                                <div className="col-5">
                                    <input className="add-topic-input"/>
                                </div>
                            </div>

                            <div className="row add-topic-question-block">
                                <div className="col-2 question-number">

                                </div>
                                <div className="col-5">
                                    Добавить вопрос
                                </div>
                                <div className="col-5">

                                </div>
                            </div>
                        </div>

                        <div className="add-task-block">
                            <div className="add-topic-block-header">Задание 2</div>
                            <label className="add-topic-label">Заголовок</label>
                            <input className="add-topic-input"/>
                            <label className="add-topic-label mt-5">Вопросы</label>
                            <div className="row">
                                <div className="col-2"></div>
                                <div className="col-5">
                                    Заголовок
                                </div>
                                <div className="col-5">
                                    Правильный ответ
                                </div>
                            </div>
                            <div className="row add-topic-question-block">
                                <div className="col-2 question-number">
                                    1
                                </div>
                                <div className="col-5">
                                    <input className="add-topic-input"/>
                                </div>
                                <div className="col-5">
                                    <input className="add-topic-input"/>
                                </div>
                            </div>
                            <div className="row add-topic-question-block">
                                <div className="col-2 question-number">
                                    2
                                </div>
                                <div className="col-5">
                                    <input className="add-topic-input"/>
                                </div>
                                <div className="col-5">
                                    <input className="add-topic-input"/>
                                </div>
                            </div>

                            <div className="row add-topic-question-block">
                                <div className="col-2 question-number">

                                </div>
                                <div className="col-5">
                                    Добавить вопрос
                                </div>
                                <div className="col-5">

                                </div>
                            </div>
                        </div>


                        <div className="add-task-block">
                            <div className="add-topic-block-header">Задание 3</div>
                            <label className="add-topic-label">Заголовок</label>
                            <input className="add-topic-input"/>
                            <label className="add-topic-label mt-5">Вопросы</label>
                            <div className="row">
                                <div className="col-2"></div>
                                <div className="col-5">
                                    Заголовок
                                </div>
                                <div className="col-4">
                                    Варианты ответов
                                </div>
                                <div className="col-1">
                                    True
                                </div>
                            </div>
                            <div className="row add-topic-question-block">
                                <div className="col-2 question-number">
                                    1
                                </div>
                                <div className="col-5">
                                    <input className="add-topic-input"/>
                                </div>
                                <div className="col-4">
                                    <input className="add-topic-input"/>
                                </div>
                                <div className="col-1">
                                    <input type="checkbox"/>
                                </div>
                            </div>
                            <div className="row add-topic-question-block">
                                <div className="col-2 question-number">

                                </div>
                                <div className="col-5">
                                </div>
                                <div className="col-4">
                                    <input className="add-topic-input"/>
                                </div>
                                <div className="col-1">
                                    <input type="checkbox"/>
                                </div>
                            </div>

                            <div className="row add-topic-question-block mb-4">
                                <div className="col-2 question-number">

                                </div>
                                <div className="col-5">
                                </div>
                                <div className="col-4">
                                    Добавить вариант
                                </div>
                                <div className="col-1">
                                </div>
                            </div>


                            <div className="row add-topic-question-block">
                                <div className="col-2 question-number">
                                    2
                                </div>
                                <div className="col-5">
                                    <input className="add-topic-input"/>
                                </div>
                                <div className="col-4">
                                    <input className="add-topic-input"/>
                                </div>
                                <div className="col-1">
                                    <input type="checkbox"/>
                                </div>
                            </div>
                            <div className="row add-topic-question-block">
                                <div className="col-2 question-number">

                                </div>
                                <div className="col-5">
                                </div>
                                <div className="col-4">
                                    <input className="add-topic-input"/>
                                </div>
                                <div className="col-1">
                                    <input type="checkbox"/>
                                </div>
                            </div>

                            <div className="row add-topic-question-block">
                                <div className="col-2 question-number">

                                </div>
                                <div className="col-5">
                                </div>
                                <div className="col-4">
                                    Добавить вариант
                                </div>
                                <div className="col-1">
                                </div>
                            </div>




                            <div className="row add-topic-question-block">
                                <div className="col-2 question-number">

                                </div>
                                <div className="col-5">
                                    Добавить вопрос
                                </div>
                                <div className="col-4">
                                </div>
                                <div className="col-1">
                                </div>
                            </div>


                        </div>

                        <div>
                            <div className="add-task-header">Добавить задание</div>
                            <div className="row w-75 m-auto">
                                <div className="col-4 m-0 text-center">
                                    <div className="add-task-icon-wrapper">
                                        <img src={match} className="add-task-icon"/>
                                    </div>
                                    <div className="add-task-label">Соединить</div>
                                </div>
                                <div className="col-4 m-0 text-center">
                                    <div className="add-task-icon-wrapper">
                                        <img src={choose} className="add-task-icon"/>
                                    </div>
                                    <div className="add-task-label">Выбрать из вариантов</div>
                                </div>
                                <div className="col-4 m-0 text-center">
                                    <div className="add-task-icon-wrapper">
                                        <img src={answer} className="add-task-icon"/>
                                    </div>
                                    <div className="add-task-label">Ввести ответ</div>
                                </div>
                            </div>
                        </div>


                        <div className="button-block">
                            <button className="add-topic-button add-topic-button-active">Сохранить</button>
                            <button className="add-topic-button">Отмена</button>
                        </div>
                    </div>
                </div>
            </main>
        )
    }
}

export default AddTopicFormContainer;