package by.bsu.pashkovich.controller;

import by.bsu.pashkovich.dto.score.ScoreDto;
import by.bsu.pashkovich.dto.UserDto;
import by.bsu.pashkovich.service.TopicService;
import by.bsu.pashkovich.service.UserService;
import by.bsu.pashkovich.validation.UserValidator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("english2C/users")
public class UserController {
    private UserService userService;
    private TopicService topicService;
    private UserValidator userValidator;

    @Autowired
    public UserController(UserService userService, TopicService topicService, UserValidator userValidator) {
        this.userService = userService;
        this.topicService = topicService;
        this.userValidator = userValidator;
    }

    @PutMapping("/{id}")
    public ResponseEntity editStudentData(@PathVariable("id") Long userId,
                                          @RequestBody UserDto userDto) {
        userDto.setId(userId);
        return new ResponseEntity<>(userService.editStudentData(userDto), HttpStatus.OK);
    }

    @GetMapping("/{id}/scores")
    public ResponseEntity getUserScores(@PathVariable("id") Long userId) {
        return new ResponseEntity<>(topicService.getInProgressTopics(userId), HttpStatus.OK);
    }

    @PostMapping("/{id}/scores")
    public ResponseEntity save(@PathVariable("id") Long userID,
                               @RequestBody ScoreDto scoreDto) {
        UserDto userDto = new UserDto();
        userDto.setId(userID);
        scoreDto.setUser(userDto);
        return new ResponseEntity<>(userService.saveScore(scoreDto), HttpStatus.OK);
    }
}
