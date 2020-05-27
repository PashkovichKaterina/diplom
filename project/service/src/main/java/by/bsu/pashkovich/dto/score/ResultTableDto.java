package by.bsu.pashkovich.dto.score;

import by.bsu.pashkovich.dto.UserDto;

import java.util.List;

public class ResultTableDto {
    private UserDto user;
    private List<AdminScoreDto> scores;

    public ResultTableDto() {
    }

    public UserDto getUser() {
        return user;
    }

    public List<AdminScoreDto> getScores() {
        return scores;
    }

    public void setUser(UserDto user) {
        this.user = user;
    }

    public void setScores(List<AdminScoreDto> scores) {
        this.scores = scores;
    }
}
