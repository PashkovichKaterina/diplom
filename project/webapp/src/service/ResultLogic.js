class ResultLogic {
    calculateResultOfCorrectAnswer(correctAnswerCount, questionCount) {
        return (correctAnswerCount * 100 / questionCount).toFixed(2);
    }

    calculateResultOfWrongAnswer(wrongAnswerCount, questionCount) {
        const result = ((questionCount - wrongAnswerCount) / questionCount) * 100;
        return result < 0 ? 0 : result.toFixed(2);
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