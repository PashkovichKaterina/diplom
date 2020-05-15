package by.bsu.pashkovich.service.impl;

import by.bsu.pashkovich.dto.ScoreDto;
import by.bsu.pashkovich.entity.user.Score;
import by.bsu.pashkovich.repository.ScoreRepository;
import by.bsu.pashkovich.repository.TaskRepository;
import by.bsu.pashkovich.repository.TopicRepository;
import by.bsu.pashkovich.repository.UserRepository;
import by.bsu.pashkovich.security.SecurityUser;
import by.bsu.pashkovich.service.ScoreService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
public class ScoreServiceImpl implements ScoreService {
    private ScoreRepository scoreRepository;
    private UserRepository userRepository;
    private TaskRepository taskRepository;
    private TopicRepository topicRepository;

    @Autowired
    public ScoreServiceImpl(UserRepository userRepository, TaskRepository taskRepository,
                            TopicRepository topicRepository, ScoreRepository scoreRepository) {
        this.userRepository = userRepository;
        this.taskRepository = taskRepository;
        this.topicRepository = topicRepository;
        this.scoreRepository = scoreRepository;
    }

    @Override
    public void save(ScoreDto scoreDto) {
        Score score = new Score();
        Long userId = ((SecurityUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getId();
        score.setUser(userRepository.findById(userId).get());
        score.setTask(taskRepository.findById(scoreDto.getTaskId()).get());
        score.setTopic(topicRepository.findById(scoreDto.getTopicId()).get());
        score.setValue(scoreDto.getValue());
        scoreRepository.save(score);
    }
}
