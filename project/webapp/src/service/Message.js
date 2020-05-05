class Message {
    constructor() {
        this.messages = {
            login: "Логин",
            loginPlaceholder: "Введите логин",
            email: "Электронная почта",
            emailPlaceholder: "Введите электронную почту",
            password: "Пароль",
            passwordPlaceholder: "Введите пароль",
            loginOrEmail: "Логин или электронная почта",
            loginOrEmailPlaceholder: "Введите логин или электронную почту",
            confirmPassword: "Повторите пароль",
            confirmPasswordPlaceholder: "Введите повтор пароля",
            cancel: "Отмена",
            signup: "Регистрация",
            emailError: "Неккоректная электронная почта",
            loginError: "Длина логина должна быть от 1 до 30 символов без пробелов",
            passwordError: "Пароль должен содержать не менее 8 символов включая 1 цифру и 1 букву",
            confirmPasswordError: "Пароли не совпадают",
            authenticationException: "Неверный логин или пароль",
            repeatLoginAndEmail: "Пользователь с такими логином и электронной почтой уже зарегистрирован",
            repeatLogin: "Пользователь с таким логином почтой уже зарегистрирован",
            repeatEmail: "Пользователь с такой электронной почтой уже зарегистрирован",
            generalException: "Убедитесь в правильности запроса и попробуйте еще раз",
            delete: "Удалить",
            edit: "Редактировать",
            logout: "Выйти"
        }
    }

    getString(name) {
        return this.messages[name];
    }
}

export default new Message();