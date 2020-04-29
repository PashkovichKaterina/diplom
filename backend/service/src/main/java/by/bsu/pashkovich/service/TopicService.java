package by.bsu.pashkovich.service;

import by.bsu.pashkovich.entity.Topic;
import org.springframework.data.domain.Page;

import java.util.List;

public interface TopicService {
    List<Topic> getTopicsByCourse(Long coursesNumber);

    Page<Topic> getTopicsByCourse(Long coursesNumber, int page, int size);
}
