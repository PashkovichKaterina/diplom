import React from 'react';
import im from "../../image/404.png";
import '../../index.css';

const Error404 = () => {
    document.getElementById("root").style.padding = '0';
    return (
        <div className="container">
            <div className="row error-page">
                <div className="col-6 align-self-center text-right">
                    <img src={im} className="error-page-image"/>
                </div>
                <div className="col-6 align-self-center">
                    <div className="error-page-header">404 Страница не найдена</div>
                    <div className="error-page-message">Мы не можем найти страницу, которую вы ищете. Пожалуйста,
                        убедитесь, что вы ввели правильный URL.
                    </div>
                    <button className="error-page-button">Вернуться на главную</button>
                </div>
            </div>
        </div>
    )
};

export default Error404;