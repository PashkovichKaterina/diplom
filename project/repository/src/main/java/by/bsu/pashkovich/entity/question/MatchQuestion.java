package by.bsu.pashkovich.entity.question;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name = "match_questions")
public class MatchQuestion extends Question {
    @Column(name = "first_part")
    private String firstPart;

    @Column(name = "second_part")
    private String secondPart;

    public MatchQuestion() {
    }

    public String getFirstPart() {
        return firstPart;
    }

    public String getSecondPart() {
        return secondPart;
    }

    public void setFirstPart(String firstPart) {
        this.firstPart = firstPart;
    }

    public void setSecondPart(String secondPart) {
        this.secondPart = secondPart;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) {
            return true;
        }
        if (obj == null || getClass() != obj.getClass()) {
            return false;
        }
        MatchQuestion question = (MatchQuestion) obj;
        return super.equals(question)
                && (firstPart == null ? firstPart == question.firstPart : firstPart.equals(question.firstPart))
                &&(secondPart == null ? secondPart == question.secondPart : secondPart.equals(question.secondPart));
    }

    @Override
    public int hashCode() {
        return super.hashCode() + (firstPart == null ? 0 : firstPart.hashCode())
                + (secondPart == null ? 0 : secondPart.hashCode());
    }

    @Override
    public String toString() {
        return super.toString() + ";FIRST_PART=" + firstPart + ";SECOND_PART=" + secondPart;
    }
}
