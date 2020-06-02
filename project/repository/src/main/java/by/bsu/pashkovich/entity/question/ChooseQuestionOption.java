package by.bsu.pashkovich.entity.question;

import javax.persistence.*;

@Entity
@Table(name = "choose_question_options")
public class ChooseQuestionOption {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String value;

    @Column
    private Boolean status;

    public ChooseQuestionOption() {
    }

    public Long getId() {
        return id;
    }

    public String getValue() {
        return value;
    }

    public Boolean getStatus() {
        return status;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setValue(String value) {
        this.value = value;
    }

    public void setStatus(Boolean status) {
        this.status = status;
    }

    @Override
    public String toString() {
        return "ID=" + id + "VALUE=" + value + "STATUS=" + status;
    }
}
