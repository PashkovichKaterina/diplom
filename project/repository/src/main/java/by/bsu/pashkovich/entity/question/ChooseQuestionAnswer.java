package by.bsu.pashkovich.entity.question;

import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name = "choose_question_answers")
public class ChooseQuestionAnswer {
    @EmbeddedId
    private ChooseQuestionAnswerKey key;

    @Column
    private Boolean status;

    public ChooseQuestionAnswer(){}

    public ChooseQuestionAnswerKey getKey() {
        return key;
    }

    public Boolean getStatus() {
        return status;
    }

    public void setKey(ChooseQuestionAnswerKey key) {
        this.key = key;
    }

    public void setStatus(Boolean status) {
        this.status = status;
    }
}
