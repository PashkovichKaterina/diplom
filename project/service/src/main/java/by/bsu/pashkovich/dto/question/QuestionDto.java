package by.bsu.pashkovich.dto.question;

import by.bsu.pashkovich.dto.TaskDto;
import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.fasterxml.jackson.annotation.JsonTypeInfo;

@JsonTypeInfo(
        use = JsonTypeInfo.Id.NAME,
        include = JsonTypeInfo.As.PROPERTY,
        property = "type")
@JsonSubTypes({
        @JsonSubTypes.Type(value = ChooseQuestionDto.class, name = "choose"),
        @JsonSubTypes.Type(value = MatchQuestionDto.class, name = "match"),
        @JsonSubTypes.Type(value = AnswerQuestionDto.class, name = "answer")
})
public class QuestionDto {
    private Long id;

    public QuestionDto() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
}
