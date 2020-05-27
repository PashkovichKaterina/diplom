package by.bsu.pashkovich.convertion;

import by.bsu.pashkovich.dto.score.ScoreDto;
import by.bsu.pashkovich.entity.user.Score;
import by.bsu.pashkovich.entity.user.Student;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class ScoreConverter {
    private TopicConverter topicConverter;
    private TaskConverter taskConverter;
    private UserConverter userConverter;

    @Autowired
    public ScoreConverter(TopicConverter topicConverter, TaskConverter taskConverter,
                          UserConverter userConverter) {
        this.topicConverter = topicConverter;
        this.taskConverter = taskConverter;
        this.userConverter = userConverter;
    }

    public Score toScore(ScoreDto scoreDto) {
        Score score = null;
        if (scoreDto != null) {
            score = new Score();
            score.setStudent(new Student(userConverter.toUser(scoreDto.getUser())));
            score.setTopic(topicConverter.toTopic(scoreDto.getTopic()));
            score.setTask(taskConverter.toTask(scoreDto.getTask()));
            score.setValue(scoreDto.getValue());
        }
        return score;
    }

    public ScoreDto toScoreDto(Score score) {
        ScoreDto scoreDto = null;
        if (score != null) {
            scoreDto = new ScoreDto();
            scoreDto.setUser(userConverter.toUserDto(score.getStudent()));
            scoreDto.setTopic(topicConverter.toTopicDto(score.getTopic()));
            scoreDto.setTask(taskConverter.toTaskDto(score.getTask()));
            scoreDto.setPassageDate(score.getPassageDate());
            scoreDto.setValue(score.getValue());
        }
        return scoreDto;
    }

    public List<ScoreDto> toScoreDtoList(List<Score> scores) {
        return scores.stream()
                .map(this::toScoreDto)
                .collect(Collectors.toList());
    }

    public List<Score> toScoreList(List<ScoreDto> scores) {
        return scores.stream()
                .map(this::toScore)
                .collect(Collectors.toList());
    }
}
