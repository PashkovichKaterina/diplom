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

    public AnswerQuestion() {
    }

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

    @Override
    public boolean equals(Object obj) {
        if (this == obj) {
            return true;
        }
        if (obj == null || getClass() != obj.getClass()) {
            return false;
        }
        AnswerQuestion question = (AnswerQuestion) obj;
        return super.equals(question)
                && (questionTitle == null ? questionTitle == question.questionTitle
                : questionTitle.equals(question.questionTitle))
                && (correctAnswer == null ? correctAnswer == question.correctAnswer
                : correctAnswer.equals(question.correctAnswer));
    }

    @Override
    public int hashCode() {
        return super.hashCode() + (questionTitle == null ? 0 : questionTitle.hashCode())
                + (correctAnswer == null ? 0 : correctAnswer.hashCode());
    }

    @Override
    public String toString() {
        return super.toString() + ";QUESTION_TITLE=" + questionTitle + ";CORRECT_ANSWER=" + correctAnswer;
    }
}
