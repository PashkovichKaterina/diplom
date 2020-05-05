const POST_METHOD = "POST";
const LOGIN_URL = "/english2C/login";
const SIGNUP_URL = "/english2C/signup";

class AuthenticationService {
    login(user) {
        return fetch(LOGIN_URL, {
            method: POST_METHOD,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user)
        });
    }

    signup(user) {
        return fetch(SIGNUP_URL, {
            method: POST_METHOD,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user)
        });
    }
}

export default new AuthenticationService();