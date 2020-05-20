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
import by.bsu.pashkovich.dto.question.QuestionDto;
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
import java.util.stream.Collectors;

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
        setTopicStatus(foundTopicDto);
        List<TaskDto> taskDtoList = foundTopicDto.getTasks().stream().peek(this::setAnswers).collect(Collectors.toList());
        foundTopicDto.setTasks(taskDtoList);
        return foundTopicDto;
    }

    @Override
    public List<TopicDto> getTopicsByCourse(Long coursesNumber) {
        if (!courseRepository.existsByNumber(coursesNumber)) {
            throw new NoSuchEntityException("Course with number " + coursesNumber + " is not exist");
        }
        List<Topic> foundTopicList = topicRepository.getTopicsByCourse(coursesNumber);
        List<TopicDto> foundTopicDtoList = topicConverter.toTopicDtoList(foundTopicList);
        return setTopicsStatus(foundTopicDtoList);
    }

    @Override
    public PageDto<TopicDto> getTopicsByCourse(Long coursesNumber, int page, int size) {
        if (!courseRepository.existsByNumber(coursesNumber)) {
            throw new NoSuchEntityException("Course with number " + coursesNumber + " is not exist");
        }
        Pageable pageable = PageRequest.of(page - 1, size);
        Page<Topic> foundedTopicPage = topicRepository.getTopicsByCourse(coursesNumber, pageable);
        PageDto<TopicDto> pageDto = pageConverter.toPageDto(foundedTopicPage);
        List<TopicDto> topicDtoList = topicConverter.toTopicDtoList(foundedTopicPage.getContent());
        pageDto.setElements(setTopicsStatus(topicDtoList));
        return pageDto;
    }

    @Override
    public List<TopicDto> getTopicsByTitle(String topicTitle) {
        List<Topic> topicList = topicRepository.getTopicsByTitle(topicTitle);
        List<TopicDto> foundTopicDtoList = topicConverter.toTopicDtoList(topicList);
        return setTopicsStatus(foundTopicDtoList);
    }

    @Override
    public TaskDto getTopicTask(Long taskId) {
        Task foundTask = taskRepository.getTaskByIdAndTopicId(taskId);
        TaskDto foundTaskDto = taskConverter.toTaskDto(foundTask);
        setAnswers(foundTaskDto);
        setTaskStatus(foundTaskDto);
        return foundTaskDto;
    }

    @Override
    public List<TopicDto> getInProgressTopics(Long userId) {
        List<Topic> foundTopics = topicRepository.getInProgressTopics(userId);
        return setTopicsStatus(topicConverter.toTopicDtoList(foundTopics));
    }

    private void setAnswers(TaskDto taskDto) {
        if (taskDto.getQuestions() != null && taskDto.getQuestions().size() > 0
                && taskDto.getQuestions().get(0) instanceof ChooseQuestionDto) {
            taskDto.setQuestions(taskDto.getQuestions().stream()
                    .peek(questionDto -> {
                        List<ChooseQuestionAnswer> answers = answerRepository.getByQuestionId(questionDto.getId());
                        List<ChooseQuestionAnswerDto> answersDto = answerConverter.toChooseQuestionAnswerDtoList(answers);
                        ((ChooseQuestionDto) questionDto).setAnswers(answersDto);
                    })
                    .collect(Collectors.toList()));
        }
    }

    private List<TopicDto> setTopicsStatus(List<TopicDto> topicDtoList) {
        return topicDtoList.stream().peek(this::setTopicStatus).collect(Collectors.toList());
    }

    private void setTopicStatus(TopicDto topicDto) {
        Long userId = ((SecurityUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getId();
        topicDto.setStatus(scoreRepository.getUserStatusByTopic(userId, topicDto.getId()));
        List<TaskDto> taskDtoList = topicDto.getTasks().stream().peek(this::setTaskStatus).collect(Collectors.toList());
        topicDto.setTasks(taskDtoList);
    }

    private void setTaskStatus(TaskDto taskDto) {
        Long userId = ((SecurityUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getId();
        String status = scoreRepository.getUserStatusByTask(userId, taskDto.getId());
        taskDto.setStatus(status);
        if (status.equalsIgnoreCase("completed")) {
            Double value = scoreRepository.getScoreByUserAndTask(userId, taskDto.getId()).getValue();
            taskDto.setValue(value);
        }
    }
}
