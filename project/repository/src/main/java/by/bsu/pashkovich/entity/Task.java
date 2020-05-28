package by.bsu.pashkovich.entity;

import by.bsu.pashkovich.entity.question.Question;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "tasks")
public class Task {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String title;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private TaskType type;

    @OneToMany
    @JoinTable(name = "lnk_tasks_questions",
            joinColumns = {@JoinColumn(name = "task_id", referencedColumnName = "id")},
            inverseJoinColumns = {@JoinColumn(name = "question_id", referencedColumnName = "id")}
    )
    private List<Question> questions;

    public Task() {

    }

    public Long getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public TaskType getType() {
        return type;
    }

    public List<Question> getQuestions() {
        return questions;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setType(TaskType type) {
        this.type = type;
    }

    public void setQuestions(List<Question> questions) {
        this.questions = questions;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) {
            return true;
        }
        if (obj == null || getClass() != obj.getClass()) {
            return false;
        }
        Task task = (Task) obj;
        return (id == null ? id == task.id : id.equals(task.id))
                && (title == null ? title == task.title : title.equals(task.title))
                && (type == null ? type == task.type : type.equals(task.type))
                && (questions == null ? questions == task.questions : questions.equals(task.questions));
    }

    @Override
    public int hashCode() {
        return (id == null ? 0 : id.hashCode()) + (title == null ? 0 : title.hashCode())
                + (type == null ? 0 : type.hashCode()) + (questions == null ? 0 : questions.hashCode());
    }

    @Override
    public String toString() {
        return getClass().getName() + "@ID=" + id + ";TITLE=" + title + ";TYPE=" + type + ";QUESTIONS:" + questions;
    }
}
