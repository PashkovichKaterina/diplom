package by.bsu.pashkovich.entity.question;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name = "answer_questions")
public class AnswerQuestion extends Question {
    @Column(name = "question_title")
    private String questionTitle;

    @Column(name = "correct_answer")
    private String correctAnswer;

    public AnswerQuestion(){}

    public String getQuestionTitle() {
        return questionTitle;
    }

    public String getCorrectAnswer() {
        return correctAnswer;
    }

    public void setQuestionTitle(String questionTitle) {
        this.questionTitle = questionTitle;
    }

    public void setCorrectAnswer(String correctAnswer) {
        this.correctAnswer = correctAnswer;
    }
}
