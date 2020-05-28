package by.bsu.pashkovich.entity.question;

import javax.persistence.*;

@Entity
@Table(name = "choose_question_options")
public class ChooseQuestionOption {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String title;

    public ChooseQuestionOption() {
    }

    public Long getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) {
            return true;
        }
        if (obj == null || getClass() != obj.getClass()) {
            return false;
        }
        ChooseQuestionOption option = (ChooseQuestionOption) obj;
        return (id == null ? id == option.id : id.equals(option.id))
                && (title == null ? title == option.title : title.equals(option.title));
    }

    @Override
    public int hashCode() {
        return (id == null ? 0 : id.hashCode()) + (title == null ? 0 : title.hashCode());
    }

    @Override
    public String toString() {
        return getClass().getName() + "@ID=" + id + ";TITLE=" + title;
    }
}
