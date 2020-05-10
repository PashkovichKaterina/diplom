package by.bsu.pashkovich.dto.question;

public class MatchQuestionDto extends QuestionDto {
    private String firstPart;
    private String secondPart;

    public MatchQuestionDto() {
    }

    public String getFirstPart() {
        return firstPart;
    }

    public String getSecondPart() {
        return secondPart;
    }

    public void setFirstPart(String firstPart) {
        this.firstPart = firstPart;
    }

    public void setSecondPart(String secondPart) {
        this.secondPart = secondPart;
    }
}
