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

    public ChooseQuestionOption(){}

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
}
