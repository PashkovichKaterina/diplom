import jwt_decode from "jwt-decode";
import {APP_URL, PORT, POST_METHOD, REFRESH_TOKEN_URL} from "../service/ConnectionParameters";

const ACCESS_TOKEN = "accessToken";
const REFRESH_TOKEN = "refreshToken";

class AuthorizationLogic {
    isUserLogin() {
        return this.getAccessToken() !== null;
    }

    isStudentLogin() {
        return this.getAccessToken() !== null
            && jwt_decode(this.getAccessToken()).role === "STUDENT";
    }

    isAdminLogin() {
        return this.getAccessToken() !== null
            && jwt_decode(this.getAccessToken()).role === "ADMIN";
    }

    setAccessToken(token) {
        localStorage.setItem(ACCESS_TOKEN, token);
    }

    setRefreshToken(token) {
        localStorage.setItem(REFRESH_TOKEN, token);
    }

    deleteTokens() {
        localStorage.removeItem(ACCESS_TOKEN);
        localStorage.removeItem(REFRESH_TOKEN);
    }

    getAccessToken() {
        return localStorage.getItem(ACCESS_TOKEN);
    }

    getRefreshToken() {
        return localStorage.getItem(REFRESH_TOKEN);
    }

    getUserLogin() {
        const token = localStorage.getItem(ACCESS_TOKEN);
        if (token) {
            return jwt_decode(token).login;
        }
    }

    getUserId() {
        const token = localStorage.getItem(ACCESS_TOKEN);
        if (token) {
            return jwt_decode(token).sub;
        }
    }

    getStudentName() {
        const token = localStorage.getItem(ACCESS_TOKEN);
        if (token) {
            return jwt_decode(token).name;
        }
    }

    getStudentSurname() {
        const token = localStorage.getItem(ACCESS_TOKEN);
        if (token) {
            return jwt_decode(token).surname;
        }
    }

    isStudentDataFill() {
        return this.getStudentName() && this.getStudentSurname();
    }

    isValidToken() {
        const token = localStorage.getItem(ACCESS_TOKEN);
        if (token) {
            return Date.now() < jwt_decode(token).exp + "000";
        }
        return true;
    }

    checkToken() {
        let promise;
        if (!this.isValidToken()) {
            promise = this.refreshToken();
        } else {
            promise = new Promise((resolve) => {
                resolve();
            })
        }
        return promise;
    }

    refreshToken() {
        const accessToken = this.getAccessToken();
        const refreshToken = this.getRefreshToken();
        const userId = this.getUserId();
        this.deleteTokens();
        return fetch(PORT + APP_URL + REFRESH_TOKEN_URL, {
            method: POST_METHOD,
            headers: new Headers({
                'Content-Type': 'application/json',
            }),
            body: JSON.stringify({
                "userId": Number(userId),
                "accessToken": accessToken,
                "refreshToken": refreshToken
            })
        })
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
            })
            .then(json => {
                if (json) {
                    this.setAccessToken(json.accessToken);
                    this.setRefreshToken(json.refreshToken);
                }
            })
    }
}

export default new AuthorizationLogic();