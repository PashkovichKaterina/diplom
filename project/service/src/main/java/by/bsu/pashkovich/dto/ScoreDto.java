package by.bsu.pashkovich.dto;

public class ScoreDto {
    private Long topicId;
    private Long taskId;
    private Double value;

    public ScoreDto() {
    }

    public Long getTopicId() {
        return topicId;
    }

    public Long getTaskId() {
        return taskId;
    }

    public Double getValue() {
        return value;
    }

    public void setTopicId(Long topicId) {
        this.topicId = topicId;
    }

    public void setValue(Double value) {
        this.value = value;
    }

    public void setTaskId(Long taskId) {
        this.taskId = taskId;
    }
}
