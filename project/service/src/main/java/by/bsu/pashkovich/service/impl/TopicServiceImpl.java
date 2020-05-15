package by.bsu.pashkovich.service.impl;

import by.bsu.pashkovich.convertion.ChooseQuestionAnswerConverter;
import by.bsu.pashkovich.convertion.PageConverter;
import by.bsu.pashkovich.convertion.TaskConverter;
import by.bsu.pashkovich.convertion.TopicConverter;
import by.bsu.pashkovich.dto.PageDto;
import by.bsu.pashkovich.dto.TaskDto;
import by.bsu.pashkovich.dto.TopicDto;
import by.bsu.pashkovich.dto.question.ChooseQuestionAnswerDto;
import by.bsu.pashkovich.dto.question.ChooseQuestionDto;
import by.bsu.pashkovich.entity.Task;
import by.bsu.pashkovich.entity.Topic;
import by.bsu.pashkovich.entity.question.ChooseQuestionAnswer;
import by.bsu.pashkovich.exception.entity.NoSuchEntityException;
import by.bsu.pashkovich.repository.*;
import by.bsu.pashkovich.security.SecurityUser;
import by.bsu.pashkovich.service.TopicService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.context.SecurityContextHolder;
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
    private ScoreRepository scoreRepository;
    private PageConverter pageConverter;

    @Autowired
    public TopicServiceImpl(TopicRepository topicRepository, CourseRepository courseRepository,
                            TopicConverter topicConverter, TaskRepository taskRepository,
                            TaskConverter taskConverter, ChooseQuestionAnswerRepository answerRepository,
                            ChooseQuestionAnswerConverter answerConverter, ScoreRepository scoreRepository,
                            PageConverter pageConverter) {
        this.topicRepository = topicRepository;
        this.courseRepository = courseRepository;
        this.topicConverter = topicConverter;
        this.taskRepository = taskRepository;
        this.taskConverter = taskConverter;
        this.answerRepository = answerRepository;
        this.answerConverter = answerConverter;
        this.scoreRepository = scoreRepository;
        this.pageConverter = pageConverter;
    }

    @Override
    public TopicDto getTopicById(Long id) {
        Topic foundTopic = topicRepository.findById(id)
                .orElseThrow(() -> new NoSuchEntityException(""));
        TopicDto foundTopicDto = topicConverter.toTopicDto(foundTopic);
        return getTopicStatus(foundTopicDto);
    }

    @Override
    public List<TopicDto> getTopicsByCourse(Long coursesNumber) {
        if (!courseRepository.existsByNumber(coursesNumber)) {
            throw new NoSuchEntityException("Course with number " + coursesNumber + " is not exist");
        }
        List<Topic> foundTopicList = topicRepository.getTopicsByCourse(coursesNumber);
        List<TopicDto> foundTopicDtoList = topicConverter.toTopicDtoList(foundTopicList);
        return getTopicsStatus(foundTopicDtoList);
    }

    @Override
    public PageDto<TopicDto> getTopicsByCourse(Long coursesNumber, int page, int size) {
        if (!courseRepository.existsByNumber(coursesNumber)) {
            throw new NoSuchEntityException("Course with number " + coursesNumber + " is not exist");
        }
        Pageable pageable = PageRequest.of(page - 1, size);
        Page<Topic> foundedTopicPage = topicRepository.getTopicsByCourse(coursesNumber, pageable);
        PageDto<TopicDto> p = pageConverter.toPageDto(foundedTopicPage);
        p.setElements(getTopicsStatus(topicConverter.toTopicDtoList(foundedTopicPage.getContent())));
        return p;
    }

    @Override
    public List<TopicDto> getTopicsByTitle(String topicTitle) {
        List<Topic> topicList = topicRepository.getTopicsByTitle(topicTitle);
        List<TopicDto> foundTopicDtoList = topicConverter.toTopicDtoList(topicList);
        return getTopicsStatus(foundTopicDtoList);
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
        return getTaskStatus(foundTaskDto);
    }

    private List<TopicDto> getTopicsStatus(List<TopicDto> topicDtoList) {
        topicDtoList.forEach(topicDto -> getTopicStatus(topicDto));
        return topicDtoList;
    }

    private TopicDto getTopicStatus(TopicDto topicDto) {
        Long userId = ((SecurityUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getId();
        topicDto.setStatus(scoreRepository.getUserStatusByTopic(userId, topicDto.getId()));
        topicDto.getTasks().forEach(taskDto -> taskDto.setStatus(scoreRepository.getUserStatusByTask(userId, taskDto.getId())));
        return topicDto;
    }

    private TaskDto getTaskStatus(TaskDto taskDto) {
        Long userId = ((SecurityUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getId();
        taskDto.setStatus(scoreRepository.getUserStatusByTask(userId, taskDto.getId()));
        return taskDto;
    }
}
