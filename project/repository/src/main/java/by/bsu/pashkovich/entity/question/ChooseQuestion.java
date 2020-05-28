package by.bsu.pashkovich.entity.question;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name = "choose_questions")
public class ChooseQuestion extends Question {
    @Column(name = "question_title")
    private String questionTitle;

    public ChooseQuestion() {
    }

    public String getQuestionTitle() {
        return questionTitle;
    }

    public void setQuestionTitle(String questionTitle) {
        this.questionTitle = questionTitle;
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
