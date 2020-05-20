import AuthorizationLogic from "./AuthorizationLogic";

const PORT = "http://localhost:3000";

class UserService {
    editStudentData(name, surname) {
        return AuthorizationLogic.checkToken()
            .then(() => {
                return fetch(PORT + "/english2C/users/" + AuthorizationLogic.getUserId(), {
                    method: "PUT",
                    headers: new Headers({
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + AuthorizationLogic.getAccessToken()
                    }),
                    body: JSON.stringify({name: name, surname: surname})
                });
            })
    }
}

export default new UserService();