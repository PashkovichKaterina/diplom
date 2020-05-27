import {APP_URL, LOGIN_URL, PORT, POST_METHOD, SIGNUP_URL} from "./ConnectionParameters";

class AuthenticationService {
    login(user) {
        return fetch(PORT + APP_URL + LOGIN_URL, {
            method: POST_METHOD,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user)
        });
    }

    signup(user) {
        return fetch(PORT + APP_URL + SIGNUP_URL, {
            method: POST_METHOD,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user)
        });
    }
}

export default new AuthenticationService();