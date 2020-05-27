package by.bsu.pashkovich.service;

import by.bsu.pashkovich.dto.score.ScoreDto;
import by.bsu.pashkovich.dto.TokenDto;
import by.bsu.pashkovich.dto.UserDto;

public interface UserService {
    TokenDto login(String login, String password);

    UserDto signup(UserDto user);

    TokenDto refreshToken(TokenDto tokenDto);

    ScoreDto saveScore(ScoreDto scoreDto);

    UserDto editStudentData(UserDto userDto);
}
