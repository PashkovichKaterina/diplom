package by.bsu.pashkovich.dto.question;

import java.util.List;

public class ChooseQuestionDto extends QuestionDto {
    private String questionTitle;
    private List<ChooseQuestionOptionDto> answers;

    public ChooseQuestionDto() {
    }

    public String getQuestionTitle() {
        return questionTitle;
    }

    public List<ChooseQuestionOptionDto> getAnswers() {
        return answers;
    }

    public void setQuestionTitle(String questionTitle) {
        this.questionTitle = questionTitle;
    }

    public void setAnswers(List<ChooseQuestionOptionDto> answers) {
        this.answers = answers;
    }
}
