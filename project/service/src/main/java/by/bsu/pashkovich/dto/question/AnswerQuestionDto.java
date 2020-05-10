package by.bsu.pashkovich.dto.question;

public class AnswerQuestionDto extends QuestionDto {
    private String questionTitle;
    private String correctAnswer;

    public AnswerQuestionDto() {
    }

    public String getQuestionTitle() {
        return questionTitle;
    }

    public String getCorrectAnswer() {
        return correctAnswer;
    }

    public void setQuestionTitle(String questionTitle) {
        this.questionTitle = questionTitle;
    }

    public void setCorrectAnswer(String correctAnswer) {
        this.correctAnswer = correctAnswer;
    }
}
