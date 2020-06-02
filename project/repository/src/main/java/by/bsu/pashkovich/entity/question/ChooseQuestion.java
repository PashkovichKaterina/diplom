package by.bsu.pashkovich.entity.question;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "choose_questions")
public class ChooseQuestion extends Question {
    @Column(name = "question_title")
    private String questionTitle;

    @OneToMany(cascade = {CascadeType.REMOVE})
    @JoinColumn(name = "question_id")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private List<ChooseQuestionOption> options;

    public ChooseQuestion() {
    }

    public String getQuestionTitle() {
        return questionTitle;
    }

    public List<ChooseQuestionOption> getOptions() {
        return options;
    }

    public void setQuestionTitle(String questionTitle) {
        this.questionTitle = questionTitle;
    }

    public void setOptions(List<ChooseQuestionOption> options) {
        this.options = options;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) {
            return true;
        }
        if (obj == null || getClass() != obj.getClass()) {
            return false;
        }
        ChooseQuestion question = (ChooseQuestion) obj;
        return super.equals(question)
                && (questionTitle == null ? questionTitle == question.questionTitle
                : questionTitle.equals(question.questionTitle));
    }

    @Override
    public int hashCode() {
        return super.hashCode() + (questionTitle == null ? 0 : questionTitle.hashCode());
    }

    @Override
    public String toString() {
        return super.toString() + ";QUESTION_TITLE=" + questionTitle;
    }
}
