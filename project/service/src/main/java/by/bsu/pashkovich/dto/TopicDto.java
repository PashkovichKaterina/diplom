package by.bsu.pashkovich.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;

public class TopicDto {
    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    private Long id;
    private String title;
    private Long courseNumber;
    private List<TaskDto> tasks;

    public TopicDto() {
    }

    public Long getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public Long getCourseNumber() {
        return courseNumber;
    }

    public void setTasks(List<TaskDto> tasks) {
        this.tasks = tasks;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setCourseNumber(Long courseNumber) {
        this.courseNumber = courseNumber;
    }

    public List<TaskDto> getTasks() {
        return tasks;
    }
}
