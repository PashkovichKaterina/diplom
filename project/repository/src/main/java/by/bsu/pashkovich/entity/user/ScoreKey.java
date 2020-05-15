package by.bsu.pashkovich.entity.user;

import by.bsu.pashkovich.entity.Task;
import by.bsu.pashkovich.entity.Topic;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.Embeddable;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import java.io.Serializable;

@Embeddable
public class ScoreKey implements Serializable {
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    private User user;

    @ManyToOne
    @JoinColumn(name = "topic_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Topic topic;

    @ManyToOne
    @JoinColumn(name = "task_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Task task;

    public ScoreKey() {
    }

    public User getUser() {
        return user;
    }

    public Topic getTopic() {
        return topic;
    }

    public Task getTask() {
        return task;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public void setTask(Task task) {
        this.task = task;
    }

    public void setTopic(Topic topic) {
        this.topic = topic;
    }
}
