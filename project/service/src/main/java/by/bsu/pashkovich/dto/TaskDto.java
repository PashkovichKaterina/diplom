package by.bsu.pashkovich.dto;

import by.bsu.pashkovich.dto.question.QuestionDto;
import by.bsu.pashkovich.entity.TaskType;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;

public class TaskDto {
    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    private Long id;
    private String title;
    private TaskType type;
    private List<QuestionDto> questions;
    private String status;

    public TaskDto() {
    }

    public Long getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public TaskType getType() {
        return type;
    }

    public List<QuestionDto> getQuestions() {
        return questions;
    }

    public String getStatus() {
        return status;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setType(TaskType type) {
        this.type = type;
    }

    public void setQuestions(List<QuestionDto> questions) {
        this.questions = questions;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
