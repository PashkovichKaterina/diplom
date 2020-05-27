import AuthorizationLogic from "../logic/AuthorizationLogic";
import {
    APP_URL, GET_METHOD,
    PORT, TASK_URL,
    TOPICS_BY_COURSE_URL,
    TOPICS_BY_COURSE_WITH_PAGINATION_URL, TOPICS_BY_ID_URL,
    TOPICS_BY_TITLE_URL
} from "./ConnectionParameters";
import Util from "../logic/Util";

class TopicService {
    getAllTopicsByCourseNumber(courseNumber) {
        return AuthorizationLogic.checkToken()
            .then(() => {
                return fetch(Util.format(PORT + APP_URL + TOPICS_BY_COURSE_URL, courseNumber), {
                    method: GET_METHOD,
                    headers: new Headers({
                        'Authorization': 'Bearer ' + AuthorizationLogic.getAccessToken()
                    })
                });
            })
    }

    getTopicsByCourseNumber(courseNumber) {
        return AuthorizationLogic.checkToken()
            .then(() => {
                return fetch(Util.format(PORT + APP_URL + TOPICS_BY_COURSE_WITH_PAGINATION_URL, courseNumber), {
                    method: GET_METHOD,
                    headers: new Headers({
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + AuthorizationLogic.getAccessToken()
                    })
                })
            })
    }

    getTopicsByTitle(topicTitle) {
        return AuthorizationLogic.checkToken()
            .then(() => {
                return fetch(Util.format(PORT + APP_URL + TOPICS_BY_TITLE_URL, topicTitle), {
                    method: GET_METHOD,
                    headers: new Headers({
                        'Authorization': 'Bearer ' + AuthorizationLogic.getAccessToken()
                    })
                });
            })
    }

    getTopicById(topicId) {
        return AuthorizationLogic.checkToken()
            .then(() => {
                return fetch(Util.format(PORT + APP_URL + TOPICS_BY_ID_URL, topicId), {
                    method: GET_METHOD,
                    headers: new Headers({
                        'Authorization': 'Bearer ' + AuthorizationLogic.getAccessToken()
                    })
                });
            })
    }

    getTopicTask(topicId, taskId) {
        return AuthorizationLogic.checkToken()
            .then(() => {
                return fetch(Util.format(PORT + APP_URL + TASK_URL, topicId, taskId), {
                    method: GET_METHOD,
                    headers: new Headers({
                        'Authorization': 'Bearer ' + AuthorizationLogic.getAccessToken()
                    })
                });
            })
    }
}

export default new TopicService();