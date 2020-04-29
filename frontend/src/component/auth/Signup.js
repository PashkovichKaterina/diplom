import React from 'react';
import "./auth.css"

class Signup extends React.PureComponent {
    render() {
        return (
            <main className="login-main">
                <div className="container-fluid login-block">
                    <div className="row m-auto">
                        <div className="col-lg-6 text-center">
                            <div className="row auth-header-block">
                                <div className="col-6 auth-header">ВХОД</div>
                                <div className="col-6 auth-header-active">РЕГИСТРАЦИЯ</div>
                            </div>
                            <form className="align-self-center">
                                <div className="form-element text-center">
                                    <label className="form-label  text-left">Логин</label>
                                    <input type="text" className="form-input" placeholder="Введите логин..."/>
                                </div>

                                <div className="form-element text-center">
                                    <label className="form-label  text-left">Электронная почта</label>
                                    <input type="text" className="form-input"
                                           placeholder="Введите электронную почту..."/>
                                </div>

                                <div className="form-element text-center">
                                    <label className="form-label  text-left">Пароль</label>
                                    <input type="text" className="form-input" placeholder="Введите пароль..."/>
                                </div>

                                <div className="form-element text-center">
                                    <label className="form-label  text-left">Повторите пароль</label>
                                    <input type="text" className="form-input" placeholder="Введите пароль еще раз..."/>
                                </div>

                                <div className="auth-button-block">
                                    <div className="row">
                                        <div className="col-lg-6">
                                            <button className="auth-button">Регистрация</button>
                                        </div>
                                        <div className="col-lg-6">
                                            <button className="auth-button-cancel">Отмена</button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className="col-lg-6 p-0">
                            <div className="login-image"/>
                        </div>
                    </div>
                </div>
            </main>
        )
    }
}

export default Signup;