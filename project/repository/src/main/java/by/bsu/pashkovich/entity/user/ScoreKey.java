package by.bsu.pashkovich.entity.user;

import by.bsu.pashkovich.entity.Task;
import by.bsu.pashkovich.entity.Topic;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDateTime;

@Embeddable
public class ScoreKey implements Serializable {
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Student student;

    @ManyToOne
    @JoinColumn(name = "topic_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Topic topic;

    @ManyToOne
    @JoinColumn(name = "task_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Task task;

    @Column(name = "passage_date")
    @UpdateTimestamp
    private LocalDateTime passageDate;

    public ScoreKey() {
    }

    public Student getStudent() {
        return student;
    }

    public Topic getTopic() {
        return topic;
    }

    public Task getTask() {
        return task;
    }

    public LocalDateTime getPassageDate() {
        return passageDate;
    }

    public void setStudent(Student student) {
        this.student = student;
    }

    public void setTask(Task task) {
        this.task = task;
    }

    public void setTopic(Topic topic) {
        this.topic = topic;
    }

    public void setPassageDate(LocalDateTime passageDate) {
        this.passageDate = passageDate;
    }

    @Override
    public String toString() {
        return getClass().getName() + "@STUDENT:" + student.toString() + "TOPIC:" + topic.toString()
                + "@TASK:" + task.toString();
    }
}