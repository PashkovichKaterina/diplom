package by.bsu.pashkovich.entity.user;

import by.bsu.pashkovich.entity.Task;
import by.bsu.pashkovich.entity.Topic;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.Table;
import java.time.LocalDateTime;

@Entity
@Table(name = "scores")
public class Score {
    @EmbeddedId
    private ScoreKey scoreKey = new ScoreKey();

    @Column(name = "passage_date")
    @UpdateTimestamp
    private LocalDateTime passageDate;

    @Column
    private Double value;

    public Score() {
    }

    public ScoreKey getScoreKey() {
        return scoreKey;
    }


    public LocalDateTime getPassageDate() {
        return passageDate;
    }

    public Double getValue() {
        return value;
    }

    public void setPassageDate(LocalDateTime passageDate) {
        this.passageDate = passageDate;
    }

    public void setValue(Double value) {
        this.value = value;
    }

    public void setScoreKey(ScoreKey scoreKey) {
        this.scoreKey = scoreKey;
    }

    public User getUser() {
        return scoreKey.getUser();
    }

    public Topic getTopic() {
        return scoreKey.getTopic();
    }

    public Task getTask() {
        return scoreKey.getTask();
    }

    public void setUser(User user) {
        this.scoreKey.setUser(user);
    }

    public void setTask(Task task) {
        this.scoreKey.setTask(task);
    }

    public void setTopic(Topic topic) {
        this.scoreKey.setTopic(topic);
    }
}
