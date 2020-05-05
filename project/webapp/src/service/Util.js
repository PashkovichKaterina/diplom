class Util {
    format() {
        let s = arguments[0];
        for (let i = 0; i < arguments.length - 1; i += 1) {
            let reg = new RegExp('\\{' + i + '\\}', 'gm');
            s = s.replace(reg, arguments[i + 1]);
        }
        return s;
    }

    capitalize(s) {
        return s.charAt(0).toUpperCase() + s.slice(1);
    }

    formatTopicTitle(topicTitle) {
        return topicTitle.length > 30
            ? topicTitle.substr(0, 27).toUpperCase() + "..."
            : topicTitle.toUpperCase();
    }
}

export default new Util();
