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
}