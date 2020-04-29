package by.bsu.pashkovich.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

public class TopicDto {
    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    private Long id;
    private String title;
    private Long courseNumber;

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

    public void setId(Long id) {
        this.id = id;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setCourseNumber(Long courseNumber) {
        this.courseNumber = courseNumber;
    }
}
