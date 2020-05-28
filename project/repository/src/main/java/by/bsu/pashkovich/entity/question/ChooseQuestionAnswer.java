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

    public ChooseQuestionAnswer() {
    }

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

    @Override
    public boolean equals(Object obj) {
        if (this == obj) {
            return true;
        }
        if (obj == null || getClass() != obj.getClass()) {
            return false;
        }
        ChooseQuestionAnswer answer = (ChooseQuestionAnswer) obj;
        return (key == null ? key == answer.key : key.equals(answer.key))
                && (status == null ? status == answer.status : status.equals(answer.status));
    }

    @Override
    public int hashCode() {
        return (key == null ? 0 : key.hashCode()) + (status == null ? 0 : status.hashCode());
    }

    @Override
    public String toString() {
        return getClass().getName() + key + ";STATUS=" + status;
    }
}
