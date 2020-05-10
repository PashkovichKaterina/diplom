package by.bsu.pashkovich.convertion;

import by.bsu.pashkovich.dto.TopicDto;
import by.bsu.pashkovich.entity.Course;
import by.bsu.pashkovich.entity.Topic;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class TopicConverter {
    private TaskConverter taskConverter;

    @Autowired
    public TopicConverter(TaskConverter taskConverter) {
        this.taskConverter = taskConverter;
    }

    public Topic toTopic(TopicDto topicDto) {
        Topic topic = null;
        if (topicDto != null) {
            topic = new Topic();
            topic.setId(topicDto.getId());
            topic.setTitle(topicDto.getTitle());
            Course course = new Course();
            course.setNumber(topicDto.getCourseNumber());
            topic.setCourse(course);
            topic.setTasks(taskConverter.toTaskList(topicDto.getTasks()));
        }
        return topic;
    }

    public TopicDto toTopicDto(Topic topic) {
        TopicDto topicDto = null;
        if (topic != null) {
            topicDto = new TopicDto();
            topicDto.setId(topic.getId());
            topicDto.setTitle(topic.getTitle());
            topicDto.setCourseNumber(topic.getCourse().getNumber());
            topicDto.setTasks(taskConverter.toTaskDtoList(topic.getTasks()));
        }
        return topicDto;
    }

    public List<TopicDto> toTopicDtoList(List<Topic> topics) {
        return topics.stream()
                .map(this::toTopicDto)
                .collect(Collectors.toList());
    }
}
