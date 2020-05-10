package by.bsu.pashkovich.service;

import by.bsu.pashkovich.dto.TaskDto;
import by.bsu.pashkovich.dto.TopicDto;
import by.bsu.pashkovich.entity.Topic;
import org.springframework.data.domain.Page;

import java.util.List;

public interface TopicService {
    TopicDto getTopicById(Long id);

    List<TopicDto> getTopicsByCourse(Long coursesNumber);

    Page<Topic> getTopicsByCourse(Long coursesNumber, int page, int size);

    List<TopicDto> getTopicsByTitle(String topicTitle);

    TaskDto getTopicTask(Long taskId);
}
