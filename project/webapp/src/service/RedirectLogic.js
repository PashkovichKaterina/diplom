import Util from "./Util";
import AuthorizationLogic from "./AuthorizationLogic";

const LOGIN_URL = "/login";
const SIGUP_URL = "/signup";
const TOPICS_URL = "/topics";
const MAIN_URL = "/";
const EDIT_STUDENT_URL = "/users/{0}/edit";
const USER_PROFILE_URL = "/users/{0}";
const TOPIC_URL = "/topics/{0}/tasks";
const TASK_URL = "/topics/{0}/tasks/{1}";

class RedirectLogic {
    redirect(url) {
        window.location.href = url;
    }

    reload() {
        window.location.reload();
    }

    redirectToMainPage() {
        this.redirect(MAIN_URL);
    }

    redirectToLogin() {
        this.redirect(LOGIN_URL);
    }

    redirectToSignup() {
        this.redirect(SIGUP_URL);
    }

    redirectToEditStudentForm() {
        const userId = AuthorizationLogic.getUserId();
        this.redirect(Util.format(EDIT_STUDENT_URL, userId));
    }

    redirectToUserProfile() {
        const userId = AuthorizationLogic.getUserId();
        this.redirect(Util.format(USER_PROFILE_URL, userId));
    }

    redirectToTopics() {
        this.redirect(TOPICS_URL);
    }

    redirectToTopic(topicId) {
        this.redirect(Util.format(TOPIC_URL, topicId));
    }

    redirectToTask(topicId, taskId) {
        this.redirect(Util.format(TASK_URL, topicId, taskId));
    }

}

export default new RedirectLogic();