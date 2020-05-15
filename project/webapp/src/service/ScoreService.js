import AuthorizationLogic from "./AuthorizationLogic";

const PORT = "http://localhost:3000";

class ScoreService {
    saveUserResult(topicId, taskId, value) {
        console.log(JSON.stringify({
            taskId: taskId,
            topicId: topicId,
            value: value
        }));
        return fetch(PORT + "/english2C/scores", {
            method: "POST",
            headers: new Headers({
                'Authorization': 'Bearer ' + AuthorizationLogic.getAccessToken(),
                'Content-Type': 'application/json',
            }),
            body: JSON.stringify({
                taskId: taskId,
                topicId: topicId,
                value: value
            })
        });
    }
}

export default new ScoreService();