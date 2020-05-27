package by.bsu.pashkovich.dto.score;

public class ValueDto {
    private Long taskId;
    private Double value;

    public ValueDto() {
    }

    public Long getTaskId() {
        return taskId;
    }

    public Double getValue() {
        return value;
    }

    public void setTaskId(Long taskId) {
        this.taskId = taskId;
    }

    public void setValue(Double value) {
        this.value = value;
    }
}
