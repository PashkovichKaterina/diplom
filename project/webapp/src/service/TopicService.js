import AuthorizationLogic from "./AuthorizationLogic";

const PORT = "http://localhost:3000";

class TopicService {
    getAllTopicsByCourseNumber(courseNumber) {
        AuthorizationLogic.checkToken();
        return fetch(PORT + "/english2c/topics?course=" + courseNumber, {
            method: "GET",
            headers: new Headers({
                'Authorization': 'Bearer ' + AuthorizationLogic.getAccessToken()
            })
        });
    }

    getTopicsByCourseNumber(courseNumber) {
        AuthorizationLogic.checkToken();
        return fetch(PORT + "/english2c/topics?course=" + courseNumber + "&page=1&size=6", {
            method: "GET",
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + AuthorizationLogic.getAccessToken()
            })
        });
    }

    getTopicsByTitle(topicTitle) {
        AuthorizationLogic.checkToken();
        return fetch(PORT + "/english2c/topics?topicTitle=" + topicTitle, {
            method: "GET",
            headers: new Headers({
                'Authorization': 'Bearer ' + AuthorizationLogic.getAccessToken()
            })
        });
    }

    getTopicsById(topicId) {
        AuthorizationLogic.checkToken();
        return fetch(PORT + "/english2c/topics/" + topicId, {
            method: "GET",
            headers: new Headers({
                'Authorization': 'Bearer ' + AuthorizationLogic.getAccessToken()
            })
        });
    }

    getTopicTask(topicId, taskId) {
        AuthorizationLogic.checkToken();
        return fetch(PORT + "/english2c/topics/" + topicId + "/tasks/" + taskId, {
            method: "GET",
            headers: new Headers({
                'Authorization': 'Bearer ' + AuthorizationLogic.getAccessToken()
            })
        });
    }
}

export default new TopicService();