package by.bsu.pashkovich.service.impl;

import by.bsu.pashkovich.convertion.*;
import by.bsu.pashkovich.dto.PageDto;
import by.bsu.pashkovich.dto.score.AdminScoreDto;
import by.bsu.pashkovich.dto.score.ResultTableDto;
import by.bsu.pashkovich.dto.TaskDto;
import by.bsu.pashkovich.dto.TopicDto;
import by.bsu.pashkovich.dto.score.ValueDto;
import by.bsu.pashkovich.entity.Task;
import by.bsu.pashkovich.entity.Topic;
import by.bsu.pashkovich.entity.question.ChooseQuestion;
import by.bsu.pashkovich.entity.question.Question;
import by.bsu.pashkovich.entity.user.Score;
import by.bsu.pashkovich.entity.user.Student;
import by.bsu.pashkovich.exception.entity.NoSuchEntityException;
import by.bsu.pashkovich.repository.*;
import by.bsu.pashkovich.security.SecurityUser;
import by.bsu.pashkovich.service.TopicService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class TopicServiceImpl implements TopicService {
    private TopicRepository topicRepository;
    private TopicConverter topicConverter;
    private CourseRepository courseRepository;
    private TaskRepository taskRepository;
    private TaskConverter taskConverter;
    private ScoreRepository scoreRepository;
    private PageConverter pageConverter;
    private UserConverter userConverter;
    private QuestionRepository questionRepository;
    private ChooseQuestionOptionRepository chooseQuestionOptionRepository;

    @Autowired
    public TopicServiceImpl(TopicRepository topicRepository, CourseRepository courseRepository,
                            TopicConverter topicConverter, TaskRepository taskRepository,
                            TaskConverter taskConverter, ScoreRepository scoreRepository,
                            PageConverter pageConverter, UserConverter userConverter,
                            QuestionRepository questionRepository, ChooseQuestionOptionRepository chooseQuestionOptionRepository) {
        this.topicRepository = topicRepository;
        this.courseRepository = courseRepository;
        this.topicConverter = topicConverter;
        this.taskRepository = taskRepository;
        this.taskConverter = taskConverter;
        this.scoreRepository = scoreRepository;
        this.pageConverter = pageConverter;
        this.userConverter = userConverter;
        this.questionRepository = questionRepository;
        this.chooseQuestionOptionRepository = chooseQuestionOptionRepository;
    }

    @Override
    @Transactional
    public void save(TopicDto topicDto) {
        Topic topic = topicConverter.toTopic(topicDto);
        topic.setCourse(courseRepository.getByNumber(topic.getCourse().getNumber()));
        List<Task> tasks = topic.getTasks();
        for (Task task : tasks) {
            List<Question> questions = task.getQuestions();
            task.setQuestions(questions.stream().map(question -> {
                if (question.getClass() == ChooseQuestion.class) {
                    ChooseQuestion chooseQuestion = (ChooseQuestion) question;
                    chooseQuestion.setOptions(chooseQuestion.getOptions().stream()
                            .map(option->chooseQuestionOptionRepository.save(option))
                    .collect(Collectors.toList()));
                }
                return questionRepository.save(question);
            }).collect(Collectors.toList()));
        }
        topic.setTasks(tasks.stream().map(task -> taskRepository.save(task)).collect(Collectors.toList()));
        topicRepository.save(topic);
    }

    @Override
    public TopicDto getTopicById(Long id) {
        Topic foundTopic = topicRepository.findById(id)
                .orElseThrow(() -> new NoSuchEntityException(""));
        TopicDto foundTopicDto = topicConverter.toTopicDto(foundTopic);
        setTopicStatus(foundTopicDto);
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
    public TaskDto getTopicTask(Long topicId, Long taskId) {
        Task foundTask = taskRepository.getTaskByIdAndTopicId(taskId);
        return taskConverter.toTaskDto(foundTask);
    }

    @Override
    public List<TopicDto> getInProgressTopics(Long userId) {
        List<Topic> foundTopics = topicRepository.getInProgressTopics(userId);
        return setTopicsStatus(topicConverter.toTopicDtoList(foundTopics));
    }

    @Override
    public List<ResultTableDto> getScoresByTopic(Long topicId) {
        List<Score> scores = scoreRepository.getScoreByTopic(topicId, Sort.by(Sort.Direction.ASC, "scoreKey.passageDate"));
        Topic topic = topicRepository.findById(topicId).get();
        List<ResultTableDto> resultTableDtos = new ArrayList<>();
        Map<Student, List<Score>> phonesByCompany = scores.stream().collect(
                Collectors.groupingBy(Score::getStudent))
                .entrySet().stream().
                        sorted(Map.Entry.comparingByKey()).
                        collect(Collectors.toMap(Map.Entry::getKey, Map.Entry::getValue,
                                (oldValue, newValue) -> oldValue, LinkedHashMap::new));
        for (Map.Entry<Student, List<Score>> item : phonesByCompany.entrySet()) {
            ResultTableDto resultTableDto = new ResultTableDto();
            resultTableDto.setUser(userConverter.toUserDto(item.getKey()));
            List<AdminScoreDto> scoreDtos = new ArrayList<>();
            long i = 1;
            while (scores.stream().filter(s -> s.getStudent().getId().equals(item.getKey().getId())).count() > 0) {
                AdminScoreDto score = new AdminScoreDto();
                score.setAttemptNumber(i);
                List<ValueDto> values = new ArrayList<>();
                for (Task task : topic.getTasks()) {
                    ValueDto value = new ValueDto();
                    value.setTaskId(task.getId());
                    Score currentScore = scores.stream()
                            .filter(s -> s.getTask().getId().equals(task.getId()) && s.getStudent().getId().equals(item.getKey().getId()))
                            .findFirst().orElse(new Score());
                    scores.remove(currentScore);
                    value.setValue(currentScore.getValue());
                    values.add(value);
                }
                score.setValues(values);
                scoreDtos.add(score);
                i++;
            }
            resultTableDto.setScores(scoreDtos);
            resultTableDtos.add(resultTableDto);
        }
        return resultTableDtos;
    }

    private List<TopicDto> setTopicsStatus(List<TopicDto> topicDtoList) {
        return topicDtoList.stream().peek(this::setTopicStatus).collect(Collectors.toList());
    }

    private void setTopicStatus(TopicDto topicDto) {
        Long userId = ((SecurityUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getId();
        topicDto.setStatus(scoreRepository.getUserStatusByTopic(userId, topicDto.getId()));
        topicDto.setTasks(setTasksLastValue(topicDto.getTasks()));
    }

    private List<TaskDto> setTasksLastValue(List<TaskDto> taskDtoList) {
        Long userId = ((SecurityUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getId();
        return taskDtoList.stream().peek(taskDto -> taskDto.setLastValue(scoreRepository.getLastUserScoreByTask(userId, taskDto.getId()))).collect(Collectors.toList());
    }
}
