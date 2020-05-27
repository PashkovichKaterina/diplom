class ResultLogic {
    calculateResult(correctAnswerCount, wrongAnswerCount, questionCount) {
        const result = ((correctAnswerCount - wrongAnswerCount) / questionCount) * 100;
        return result < 0 ? 0 : result.toFixed(2);
    }

    calculateTopicScore(tasks) {
        let sum = 0;
        for (let i = 0; i < tasks.length; i++) {
            sum += tasks[i].value;
        }
        return (sum / tasks.length).toFixed(2);
    }

    isValidPrintedAnswer(userAnswer, correctAnswer) {
        return correctAnswer.toUpperCase() === userAnswer.toUpperCase()
    }

    isValidChosenAnswer(userAnswers, correctAnswers) {
        return userAnswers.length === correctAnswers.length
            && userAnswers.filter(element => !correctAnswers.includes(element)).length === 0;
    }
}

export default new ResultLogic();