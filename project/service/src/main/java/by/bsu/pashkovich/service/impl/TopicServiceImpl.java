package by.bsu.pashkovich.service.impl;

import by.bsu.pashkovich.convertion.ChooseQuestionAnswerConverter;
import by.bsu.pashkovich.convertion.QuestionConverter;
import by.bsu.pashkovich.convertion.TaskConverter;
import by.bsu.pashkovich.convertion.TopicConverter;
import by.bsu.pashkovich.dto.TaskDto;
import by.bsu.pashkovich.dto.TopicDto;
import by.bsu.pashkovich.dto.question.ChooseQuestionAnswerDto;
import by.bsu.pashkovich.dto.question.ChooseQuestionDto;
import by.bsu.pashkovich.entity.Task;
import by.bsu.pashkovich.entity.Topic;
import by.bsu.pashkovich.entity.question.ChooseQuestionAnswer;
import by.bsu.pashkovich.exception.entity.NoSuchEntityException;
import by.bsu.pashkovich.repository.ChooseQuestionAnswerRepository;
import by.bsu.pashkovich.repository.CourseRepository;
import by.bsu.pashkovich.repository.TaskRepository;
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
    private TopicConverter topicConverter;
    private TaskRepository taskRepository;
    private TaskConverter taskConverter;
    private ChooseQuestionAnswerRepository answerRepository;
    private ChooseQuestionAnswerConverter answerConverter;

    @Autowired
    public TopicServiceImpl(TopicRepository topicRepository, CourseRepository courseRepository,
                            TopicConverter topicConverter, TaskRepository taskRepository,
                            TaskConverter taskConverter, ChooseQuestionAnswerRepository answerRepository,
                            ChooseQuestionAnswerConverter answerConverter) {
        this.topicRepository = topicRepository;
        this.courseRepository = courseRepository;
        this.topicConverter = topicConverter;
        this.taskRepository = taskRepository;
        this.taskConverter = taskConverter;
        this.answerRepository = answerRepository;
        this.answerConverter = answerConverter;
    }

    @Override
    public TopicDto getTopicById(Long id) {
        Topic foundTopic = topicRepository.findById(id)
                .orElseThrow(() -> new NoSuchEntityException(""));
        return topicConverter.toTopicDto(foundTopic);
    }

    @Override
    public List<TopicDto> getTopicsByCourse(Long coursesNumber) {
        if (!courseRepository.existsByNumber(coursesNumber)) {
            throw new NoSuchEntityException("Course with number " + coursesNumber + " is not exist");
        }
        List<Topic> foundTopicList = topicRepository.getTopicsByCourse(coursesNumber);
        foundTopicList.forEach(t -> System.out.println(t.getTasks()));
        return topicConverter.toTopicDtoList(foundTopicList);
    }

    @Override
    public Page<Topic> getTopicsByCourse(Long coursesNumber, int page, int size) {
        if (!courseRepository.existsByNumber(coursesNumber)) {
            throw new NoSuchEntityException("Course with number " + coursesNumber + " is not exist");
        }
        Pageable pageable = PageRequest.of(page - 1, size);
        return topicRepository.getTopicsByCourse(coursesNumber, pageable);
    }

    @Override
    public List<TopicDto> getTopicsByTitle(String topicTitle) {
        List<Topic> topicList = topicRepository.getTopicsByTitle(topicTitle);
        return topicConverter.toTopicDtoList(topicList);
    }

    @Override
    public TaskDto getTopicTask(Long taskId) {
        Task foundTask = taskRepository.getTaskByIdAndTopicId(taskId);
        TaskDto foundTaskDto = taskConverter.toTaskDto(foundTask);
        if (foundTaskDto.getQuestions() != null && foundTaskDto.getQuestions().get(0) instanceof ChooseQuestionDto) {
            foundTaskDto.getQuestions()
                    .forEach(questionDto -> {
                        List<ChooseQuestionAnswer> answers = answerRepository.getByQuestionId(questionDto.getId());
                        List<ChooseQuestionAnswerDto> answersDto = answerConverter.toChooseQuestionAnswerDtoList(answers);
                        ((ChooseQuestionDto) questionDto).setAnswers(answersDto);
                    });
        }
        return foundTaskDto;
    }
}
