package by.bsu.pashkovich.dto.score;

import by.bsu.pashkovich.dto.TaskDto;
import by.bsu.pashkovich.dto.TopicDto;
import by.bsu.pashkovich.dto.UserDto;

import java.time.LocalDateTime;

public class ScoreDto {
    private UserDto user;
    private TopicDto topic;
    private TaskDto task;
    private Double value;
    private LocalDateTime passageDate;

    public ScoreDto() {
    }

    public UserDto getUser() {
        return user;
    }

    public TopicDto getTopic() {
        return topic;
    }

    public TaskDto getTask() {
        return task;
    }

    public Double getValue() {
        return value;
    }

    public LocalDateTime getPassageDate() {
        return passageDate;
    }

    public void setUser(UserDto user) {
        this.user = user;
    }

    public void setTopic(TopicDto topic) {
        this.topic = topic;
    }

    public void setTask(TaskDto task) {
        this.task = task;
    }

    public void setValue(Double value) {
        this.value = value;
    }


    public void setPassageDate(LocalDateTime passageDate) {
        this.passageDate = passageDate;
    }
}
