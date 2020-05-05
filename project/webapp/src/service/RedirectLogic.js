import Util from "./Util";

const LOGIN_URL = "/login";
const SIGUP_URL = "/signup";
const TOPICS_URL = "/topics";

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
        this.redirect(SIGUP_URL);
    }

    redirectToTopics() {
        this.redirect(TOPICS_URL);
    }

    redirectToUnavailableServer() {
        this.redirect("/unavailable-server");
    }
}

export default new RedirectLogic();