package by.bsu.pashkovich.entity.question;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name = "match_questions")
public class MatchQuestion extends Question{
    @Column(name = "first_part")
    private String firstPart;

    @Column(name = "second_part")
    private String secondPart;
    public MatchQuestion(){}

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
}
