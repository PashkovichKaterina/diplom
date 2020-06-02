package by.bsu.pashkovich.entity;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "topics")
public class Topic {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String title;

    @ManyToOne
    @JoinColumn(name = "course_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Course course;

    @OneToMany(cascade = {CascadeType.REMOVE})
    @JoinColumn(name = "topic_id")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private List<Task> tasks;

    public Topic() {
    }

    public Long getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public Course getCourse() {
        return course;
    }

    public List<Task> getTasks() {
        return tasks;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setCourse(Course course) {
        this.course = course;
    }

    public void setTasks(List<Task> tasks) {
        this.tasks = tasks;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) {
            return true;
        }
        if (obj == null || getClass() != obj.getClass()) {
            return false;
        }
        Topic topic = (Topic) obj;
        return (id == null ? id == topic.id : id.equals(topic.id))
                && (title == null ? title == topic.title : title.equals(topic.title))
                && (course == null ? course == topic.course : course.equals(topic.course))
                && (tasks == null ? tasks == topic.tasks : tasks.equals(topic.tasks));
    }

    @Override
    public int hashCode() {
        return (id == null ? 0 : id.hashCode()) + (title == null ? 0 : title.hashCode())
                + (course == null ? 0 : course.hashCode()) + (tasks == null ? 0 : tasks.hashCode());
    }

    @Override
    public String toString() {
        return getClass().getName() + "@ID=" + id + ";TITLE=" + title + ";COURSE:" + course + ";TASKS:" + tasks;
    }
}
