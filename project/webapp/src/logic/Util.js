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

    shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    shuffleArrayByBlock(array, count) {
        const result = [];
        let c = 0;
        while (c * count < array.length) {
            let ar = [];
            for (let i = 0, j = 0; i < count && i + (count * c) < array.length; i++, j++) {
                ar[j] = array[i + (count * c)];
            }
            c++;
            this.shuffleArray(ar);
            result.push(...ar);
        }
        array.length = 0;
        array.push(...result);
    }

    getTaskDeclension(number) {
        const lastNumber = number % 10;
        let result;
        switch (lastNumber) {
            case 1:
                result = "задание";
                break;
            case 2:
            case 3:
            case 4:
                result = "задания";
                break;
            default:
                result = "заданий";
                break;
        }
        return result;
    }

    getQuestionDeclension(number) {
        const lastNumber = number % 10;
        let result;
        switch (lastNumber) {
            case 1:
                result = "вопрос";
                break;
            case 2:
            case 3:
            case 4:
                result = "вопроса";
                break;
            default:
                result = "вопросов";
                break;
        }
        return result;
    }
}

export default new Util();
