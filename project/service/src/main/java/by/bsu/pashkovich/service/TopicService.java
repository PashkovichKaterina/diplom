package by.bsu.pashkovich.service;

import by.bsu.pashkovich.dto.PageDto;
import by.bsu.pashkovich.dto.score.ResultTableDto;
import by.bsu.pashkovich.dto.TaskDto;
import by.bsu.pashkovich.dto.TopicDto;

import java.util.List;

public interface TopicService {
    void save(TopicDto topicDto);

    TopicDto getTopicById(Long id);

    List<TopicDto> getTopicsByCourse(Long coursesNumber);

    PageDto<TopicDto> getTopicsByCourse(Long coursesNumber, int page, int size);

    List<TopicDto> getTopicsByTitle(String topicTitle);

    TaskDto getTopicTask(Long topicId, Long taskId);

    List<TopicDto> getInProgressTopics(Long userId);

    List<ResultTableDto> getScoresByTopic(Long topicId);
}
