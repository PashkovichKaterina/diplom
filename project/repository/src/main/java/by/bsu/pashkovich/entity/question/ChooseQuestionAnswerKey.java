package by.bsu.pashkovich.entity.question;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.Embeddable;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import java.io.Serializable;

@Embeddable
public class ChooseQuestionAnswerKey implements Serializable {
    @ManyToOne
    @JoinColumn(name = "question_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    private ChooseQuestion question;

    @ManyToOne
    @JoinColumn(name = "option_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    private ChooseQuestionOption option;

    public ChooseQuestionAnswerKey() {
    }

    public ChooseQuestion getQuestion() {
        return question;
    }

    public ChooseQuestionOption getOption() {
        return option;
    }

    public void setQuestion(ChooseQuestion question) {
        this.question = question;
    }

    public void setOption(ChooseQuestionOption option) {
        this.option = option;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) {
            return true;
        }
        if (obj == null || getClass() != obj.getClass()) {
            return false;
        }
        ChooseQuestionAnswerKey key = (ChooseQuestionAnswerKey) obj;
        return (question == null ? question == key.question : question.equals(key.question))
                && (option == null ? option == key.option : option.equals(key.option));
    }

    @Override
    public int hashCode() {
        return (question == null ? 0 : question.hashCode()) + (option == null ? 0 : option.hashCode());
    }

    @Override
    public String toString() {
        return getClass().getName() + ";QUESTION:" + question + ";OPTION:" + option;
    }
}
