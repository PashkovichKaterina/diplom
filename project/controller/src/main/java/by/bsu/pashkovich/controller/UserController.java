package by.bsu.pashkovich.controller;

import by.bsu.pashkovich.dto.ScoreDto;
import by.bsu.pashkovich.dto.UserDto;
import by.bsu.pashkovich.service.TopicService;
import by.bsu.pashkovich.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("english2C/users")
public class UserController {
    private UserService userService;
    private TopicService topicService;

    @Autowired
    public UserController(UserService userService, TopicService topicService) {
        this.userService = userService;
        this.topicService = topicService;
    }

    @PostMapping("/{id}/scores")
    public ResponseEntity save(@RequestBody ScoreDto scoreDto) {
        userService.saveScore(scoreDto);
        return null;
    }

    @GetMapping("/{id}/scores")
    public ResponseEntity getUserScores(@PathVariable("id") Long userId) {
        return new ResponseEntity<>(topicService.getInProgressTopics(userId), HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity editStudentData(@RequestBody UserDto userDto) {
        userService.editStudentData(userDto);
        return null;
    }
}
