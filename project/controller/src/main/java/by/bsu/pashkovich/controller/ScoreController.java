package by.bsu.pashkovich.controller;

import by.bsu.pashkovich.dto.ScoreDto;
import by.bsu.pashkovich.service.ScoreService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/english2C/scores")
public class ScoreController {
    private ScoreService scoreService;

    @Autowired
    public ScoreController(ScoreService scoreService) {
        this.scoreService = scoreService;
    }

    @PostMapping
    public ResponseEntity setScore(@RequestBody ScoreDto scoreDto) {
        scoreService.save(scoreDto);
        return null;
    }
}
