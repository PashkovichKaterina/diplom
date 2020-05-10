package by.bsu.pashkovich.dto.question;

import java.util.List;

public class ChooseQuestionDto extends QuestionDto {
    private String questionTitle;
    private List<ChooseQuestionAnswerDto> answers;

    public ChooseQuestionDto() {
    }

    public String getQuestionTitle() {
        return questionTitle;
    }

    public List<ChooseQuestionAnswerDto> getAnswers() {
        return answers;
    }

    public void setQuestionTitle(String questionTitle) {
        this.questionTitle = questionTitle;
    }

    public void setAnswers(List<ChooseQuestionAnswerDto> answers) {
        this.answers = answers;
    }
}
