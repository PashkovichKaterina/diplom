import AuthorizationLogic from "../logic/AuthorizationLogic";
import {APP_URL, GET_METHOD, PORT, POST_METHOD, TOPIC_SCORES_URL, USER_SCORES_URL} from "./ConnectionParameters";
import Util from "../logic/Util";

class ScoreService {
    saveUserResult(topicId, taskId, value) {
        return AuthorizationLogic.checkToken()
            .then(() => {
                return fetch(Util.format(PORT + APP_URL + USER_SCORES_URL, AuthorizationLogic.getUserId()), {
                    method: POST_METHOD,
                    headers: new Headers({
                        'Authorization': 'Bearer ' + AuthorizationLogic.getAccessToken(),
                        'Content-Type': 'application/json',
                    }),
                    body: JSON.stringify({
                        topic: {id: topicId},
                        task: {id: taskId},
                        value: value
                    })
                });
            })
    }

    getResultByTopic(topicId) {
        return AuthorizationLogic.checkToken()
            .then(() => {
                return fetch(Util.format(PORT + APP_URL + TOPIC_SCORES_URL, topicId), {
                    method: GET_METHOD,
                    headers: new Headers({
                        'Authorization': 'Bearer ' + AuthorizationLogic.getAccessToken(),
                        'Content-Type': 'application/json',
                    })
                });
            })
    }
}

export default new ScoreService();