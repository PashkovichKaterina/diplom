import AuthorizationLogic from "../logic/AuthorizationLogic";
import {APP_URL, GET_METHOD, PORT, PUT_METHOD, USER_PROFILE_URL, USER_SCORES_URL} from "./ConnectionParameters";
import Util from "../logic/Util";

class UserService {
    editStudentData(name, surname) {
        return AuthorizationLogic.checkToken()
            .then(() => {
                return fetch(Util.format(PORT + APP_URL + USER_PROFILE_URL, AuthorizationLogic.getUserId()), {
                    method: PUT_METHOD,
                    headers: new Headers({
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + AuthorizationLogic.getAccessToken()
                    }),
                    body: JSON.stringify({name: name, surname: surname})
                });
            })
    }

    getPassedTopic() {
        return AuthorizationLogic.checkToken()
            .then(() => {
                return fetch(Util.format(PORT + APP_URL + USER_SCORES_URL, AuthorizationLogic.getUserId()), {
                    method: GET_METHOD,
                    headers: new Headers({
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + AuthorizationLogic.getAccessToken()
                    })
                });
            })
    }
}

export default new UserService();