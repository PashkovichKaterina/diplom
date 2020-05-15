import Util from "./Util";

const LOGIN_URL = "/login";
const SIGUP_URL = "/signup";
const TOPICS_URL = "/topics";
const MAIN_URL = "/";
const TOPIC_URL = "/topics/{0}/tasks";

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

    redirectToTopics() {
        this.redirect(TOPICS_URL);
    }

    redirectToTopic(topicId) {
        this.redirect(Util.format(TOPIC_URL, topicId));
    }
}

export default new RedirectLogic();