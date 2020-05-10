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
}
