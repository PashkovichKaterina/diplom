package by.bsu.pashkovich.service.impl;

import by.bsu.pashkovich.entity.Topic;
import by.bsu.pashkovich.exception.NoSuchEntityException;
import by.bsu.pashkovich.repository.CourseRepository;
import by.bsu.pashkovich.repository.TopicRepository;
import by.bsu.pashkovich.service.TopicService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TopicServiceImpl implements TopicService {
    private TopicRepository topicRepository;
    private CourseRepository courseRepository;

    @Autowired
    public TopicServiceImpl(TopicRepository topicRepository, CourseRepository courseRepository) {
        this.topicRepository = topicRepository;
        this.courseRepository = courseRepository;
    }

    @Override
    public List<Topic> getTopicsByCourse(Long coursesNumber) {
        if (!courseRepository.existsByNumber(coursesNumber)) {
            throw new NoSuchEntityException("Course with number " + coursesNumber + " is not exist");
        }
        return topicRepository.getTopicsByCourse(coursesNumber);
    }

    @Override
    public Page<Topic> getTopicsByCourse(Long coursesNumber, int page, int size) {
        if (!courseRepository.existsByNumber(coursesNumber)) {
            throw new NoSuchEntityException("Course with number " + coursesNumber + " is not exist");
        }
        Pageable pageable = PageRequest.of(page - 1, size);
        return topicRepository.getTopicsByCourse(coursesNumber, pageable);
    }
}
