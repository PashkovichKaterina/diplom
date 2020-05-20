package by.bsu.pashkovich.service;

import by.bsu.pashkovich.dto.ScoreDto;
import by.bsu.pashkovich.dto.TokenDto;
import by.bsu.pashkovich.dto.UserDto;
import by.bsu.pashkovich.entity.user.Student;

public interface UserService {
    TokenDto login(String login, String password);

    UserDto signup(UserDto user);

    TokenDto refreshToken(TokenDto tokenDto);

    void saveScore(ScoreDto scoreDto);

    void editStudentData(UserDto userDto);
}
