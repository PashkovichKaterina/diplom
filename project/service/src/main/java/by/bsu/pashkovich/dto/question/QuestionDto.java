package by.bsu.pashkovich.dto.question;

import com.fasterxml.jackson.annotation.JsonProperty;
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
    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
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
