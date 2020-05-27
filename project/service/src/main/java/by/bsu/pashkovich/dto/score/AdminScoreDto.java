package by.bsu.pashkovich.dto.score;

import java.util.ArrayList;
import java.util.List;

public class AdminScoreDto {
    private Long attemptNumber;
    private List<ValueDto> values = new ArrayList<>();

    public AdminScoreDto() {
    }

    public Long getAttemptNumber() {
        return attemptNumber;
    }

    public List<ValueDto> getValues() {
        return values;
    }

    public void setAttemptNumber(Long attemptNumber) {
        this.attemptNumber = attemptNumber;
    }

    public void setValues(List<ValueDto> values) {
        this.values = values;
    }
}
