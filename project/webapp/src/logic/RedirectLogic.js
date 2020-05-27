import Util from "./Util";
import AuthorizationLogic from "./AuthorizationLogic";
import {
    EDIT_STUDENT_URL,
    LOGIN_URL,
    SIGNUP_URL,
    TASK_URL,
    TOPIC_URL, TOPICS_BY_ID_URL,
    TOPICS_URL,
    USER_PROFILE_URL
} from "../service/ConnectionParameters";


class RedirectLogic {
    redirect(url) {
        window.location.href = url;
    }

    reload() {
        window.location.reload();
    }

    redirectToMainPage() {
        this.redirect("/");
    }

    redirectToLogin() {
        this.redirect(LOGIN_URL);
    }

    redirectToSignup() {
        this.redirect(SIGNUP_URL);
    }

    redirectToAdminPanel() {
        this.redirect("/admin");
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

    redirectToTopicScores(topicId) {
        this.redirect(Util.format(TOPICS_BY_ID_URL, topicId));
    }
}

export default new RedirectLogic();