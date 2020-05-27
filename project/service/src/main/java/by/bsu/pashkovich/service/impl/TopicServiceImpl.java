package by.bsu.pashkovich.service.impl;

import by.bsu.pashkovich.convertion.*;
import by.bsu.pashkovich.dto.PageDto;
import by.bsu.pashkovich.dto.score.AdminScoreDto;
import by.bsu.pashkovich.dto.score.ResultTableDto;
import by.bsu.pashkovich.dto.score.ScoreDto;
import by.bsu.pashkovich.dto.TaskDto;
import by.bsu.pashkovich.dto.TopicDto;
import by.bsu.pashkovich.dto.question.ChooseQuestionAnswerDto;
import by.bsu.pashkovich.dto.question.ChooseQuestionDto;
import by.bsu.pashkovich.dto.score.ValueDto;
import by.bsu.pashkovich.entity.Task;
import by.bsu.pashkovich.entity.Topic;
import by.bsu.pashkovich.entity.question.ChooseQuestionAnswer;
import by.bsu.pashkovich.entity.user.Score;
import by.bsu.pashkovich.entity.user.Student;
import by.bsu.pashkovich.exception.entity.NoSuchEntityException;
import by.bsu.pashkovich.repository.*;
import by.bsu.pashkovich.security.SecurityUser;
import by.bsu.pashkovich.service.TopicService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Service
public class TopicServiceImpl implements TopicService {
    private TopicRepository topicRepository;
    private TopicConverter topicConverter;
    private CourseRepository courseRepository;
    private TaskRepository taskRepository;
    private TaskConverter taskConverter;
    private ChooseQuestionAnswerRepository answerRepository;
    private ChooseQuestionAnswerConverter answerConverter;
    private ScoreRepository scoreRepository;
    private PageConverter pageConverter;
    private UserConverter userConverter;

    @Autowired
    public TopicServiceImpl(TopicRepository topicRepository, CourseRepository courseRepository,
                            TopicConverter topicConverter, TaskRepository taskRepository,
                            TaskConverter taskConverter, ChooseQuestionAnswerRepository answerRepository,
                            ChooseQuestionAnswerConverter answerConverter, ScoreRepository scoreRepository,
                            PageConverter pageConverter, UserConverter userConverter) {
        this.topicRepository = topicRepository;
        this.courseRepository = courseRepository;
        this.topicConverter = topicConverter;
        this.taskRepository = taskRepository;
        this.taskConverter = taskConverter;
        this.answerRepository = answerRepository;
        this.answerConverter = answerConverter;
        this.scoreRepository = scoreRepository;
        this.pageConverter = pageConverter;
        this.userConverter = userConverter;
    }

    @Override
    public TopicDto getTopicById(Long id) {
        Topic foundTopic = topicRepository.findById(id)
                .orElseThrow(() -> new NoSuchEntityException(""));
        TopicDto foundTopicDto = topicConverter.toTopicDto(foundTopic);
        setTopicStatus(foundTopicDto);
        List<TaskDto> taskDtoList = foundTopicDto.getTasks().stream().peek(this::setAnswers).collect(Collectors.toList());
        foundTopicDto.setTasks(taskDtoList);
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
        TaskDto foundTaskDto = taskConverter.toTaskDto(foundTask);
        setAnswers(foundTaskDto);
        return foundTaskDto;
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






        /*List<Score> scores = scoreRepository.getScoreByTopic(topicId);

        List<ResultTableDto> resultTableDtos = new ArrayList<>();

        Map<Student, List<Score>> phonesByCompany = scores.stream().collect(
                Collectors.groupingBy(Score::getStudent));

        for (Map.Entry<Student, List<Score>> item : phonesByCompany.entrySet()) {

            ResultTableDto resultTableDto = new ResultTableDto();
            resultTableDto.setUser(userConverter.toUserDto(item.getKey()));
            List<AdminScoreDto> scoreDtos = new ArrayList<>();

            Map<Task, List<Score>> l2 = item.getValue().stream().collect(
                    Collectors.groupingBy(Score::getTask));

            for (Map.Entry<Task, List<Score>> i2 : l2.entrySet()) {
                long i = 1;
                for (Score score : item.getValue()) {

                    long finalI = i;
                    List<AdminScoreDto> a = scoreDtos.stream().filter(s -> s.getAttemptNumber() == finalI).collect(Collectors.toList());

                    AdminScoreDto adminScoreDto = a.size() > 0
                            ? a.get(0)
                            : new AdminScoreDto();
                    adminScoreDto.setAttemptNumber(i);

                    List<ValueDto> values = adminScoreDto.getValues();
                    ValueDto valueDto = new ValueDto();
                    valueDto.setTaskId(i2.getKey().getId());
                    valueDto.setValue(score.getValue());
                    values.add(valueDto);
                    i++;

                    adminScoreDto.setValues(values);
                    scoreDtos.add(adminScoreDto);
                }
            }
            resultTableDto.setScores(scoreDtos);
            resultTableDtos.add(resultTableDto);
        }
        return resultTableDtos;*/
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
        topicDto.setTasks(setTasksLastValue(topicDto.getTasks()));
    }

    private List<TaskDto> setTasksLastValue(List<TaskDto> taskDtoList) {
        Long userId = ((SecurityUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getId();
        return taskDtoList.stream().peek(taskDto -> taskDto.setLastValue(scoreRepository.getLastUserScoreByTask(userId, taskDto.getId()))).collect(Collectors.toList());
    }
}
