import AuthorizationLogic from "./AuthorizationLogic";

class TopicService {
    getAllTopicsByCourseNumber(courseNumber) {
        AuthorizationLogic.checkToken();
        return fetch("english2c/topics?course=" + courseNumber, {
            method: "GET",
            headers: new Headers({
                'Authorization': 'Bearer ' + AuthorizationLogic.getAccessToken()
            })
        });
    }

    getTopicsByCourseNumber(courseNumber) {
        AuthorizationLogic.checkToken();
        return fetch("english2c/topics?course=" + courseNumber + "&page=1&size=6", {
            method: "GET",
            headers: new Headers({
                'Authorization': 'Bearer ' + AuthorizationLogic.getAccessToken()
            })
        });
    }

    getTopicsByTitle(topicTitle) {
        AuthorizationLogic.checkToken();
        return fetch("english2c/topics?topicTitle=" + topicTitle, {
            method: "GET",
            headers: new Headers({
                'Authorization': 'Bearer ' + AuthorizationLogic.getAccessToken()
            })
        });
    }
}

export default new TopicService();