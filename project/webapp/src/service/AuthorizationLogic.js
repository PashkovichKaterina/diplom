import jwt_decode from "jwt-decode";

const ACCESS_TOKEN = "accessToken";
const REFRESH_TOKEN = "refreshToken";
const REFRESH_TOKEN_URL = "english2C/refreshToken";

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
        console.log("remove");
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

    isValidToken() {
        const token = localStorage.getItem(ACCESS_TOKEN);
        if (token) {
            return Date.now() < jwt_decode(token).exp + "000";
        }
        return true;
    }

    checkToken() {
        if (!this.isValidToken()) {
            this.refreshToken();
        }
    }

    refreshToken() {
        return fetch(REFRESH_TOKEN_URL, {
            method: "POST",
            body: JSON.stringify({
                ACCESS_TOKEN: this.getAccessToken(),
                REFRESH_TOKEN: this.getRefreshToken()
            })
        })
            .then(response => {
                if (!response.ok) {
                    this.deleteTokens();
                } else {
                    return response.json;
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