package by.bsu.pashkovich.entity.user;

import by.bsu.pashkovich.entity.Task;
import by.bsu.pashkovich.entity.Topic;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "scores")
public class Score {
    @EmbeddedId
    private ScoreKey scoreKey = new ScoreKey();

    @Column
    private Double value;

    @PrePersist
    public void prePersist() {
        scoreKey.setPassageDate(LocalDateTime.now());
    }

    public Score() {
    }

    public Student getStudent() {
        return scoreKey.getStudent();
    }

    public Topic getTopic() {
        return scoreKey.getTopic();
    }

    public Task getTask() {
        return scoreKey.getTask();
    }

    public LocalDateTime getPassageDate() {
        return scoreKey.getPassageDate();
    }

    public Double getValue() {
        return value;
    }

    public void setStudent(Student student) {
        scoreKey.setStudent(student);
    }

    public void setTask(Task task) {
        scoreKey.setTask(task);
    }

    public void setTopic(Topic topic) {
        scoreKey.setTopic(topic);
    }

    public void setPassageDate(LocalDateTime passageDate) {
        scoreKey.setPassageDate(passageDate);
    }

    public void setValue(Double value) {
        this.value = value;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) {
            return true;
        }
        if (obj == null || getClass() != obj.getClass()) {
            return false;
        }
        Score score = (Score) obj;
        return (scoreKey == null ? scoreKey == score.scoreKey : scoreKey.equals(score.scoreKey))
                && (value == null ? value == score.value : value.equals(score.value));
    }

    @Override
    public int hashCode() {
        return (scoreKey == null ? 0 : scoreKey.hashCode()) + (value == null ? 0 : value.hashCode());
    }

    @Override
    public String toString() {
        return getClass().getName() + scoreKey.toString() + "VALUE=" + value;
    }
}
