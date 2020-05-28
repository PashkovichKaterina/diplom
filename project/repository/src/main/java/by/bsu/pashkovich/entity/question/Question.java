package by.bsu.pashkovich.entity.question;

import javax.persistence.*;

@Entity
@Table(name = "questions")
@Inheritance(strategy = InheritanceType.JOINED)
public class Question {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    public Question() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) {
            return true;
        }
        if (obj == null || getClass() != obj.getClass()) {
            return false;
        }
        Question question = (Question) obj;
        return (id == null ? id == question.id : id.equals(question.id));
    }

    @Override
    public int hashCode() {
        return (id == null ? 0 : id.hashCode());
    }

    @Override
    public String toString() {
        return getClass().getName() + "@ID=" + id;
    }
}
