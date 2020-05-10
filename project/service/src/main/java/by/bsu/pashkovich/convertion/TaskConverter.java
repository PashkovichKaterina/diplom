package by.bsu.pashkovich.convertion;

import by.bsu.pashkovich.dto.TaskDto;
import by.bsu.pashkovich.entity.Task;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class TaskConverter {
    private QuestionConverter questionConverter;

    @Autowired
    public TaskConverter(QuestionConverter questionConverter) {
        this.questionConverter = questionConverter;
    }

    public Task toTask(TaskDto taskDto) {
        Task task = null;
        if (taskDto != null) {
            task = new Task();
            task.setId(taskDto.getId());
            task.setTitle(taskDto.getTitle());
            task.setType(taskDto.getType());
            task.setQuestions(questionConverter.toQuestionList(taskDto.getQuestions()));
        }
        return task;
    }

    public TaskDto toTaskDto(Task task) {
        TaskDto taskDto = null;
        if (task != null) {
            taskDto = new TaskDto();
            taskDto.setId(task.getId());
            taskDto.setTitle(task.getTitle());
            taskDto.setType(task.getType());
            taskDto.setQuestions(questionConverter.toQuestionDtoList(task.getQuestions()));
        }
        return taskDto;
    }

    public List<TaskDto> toTaskDtoList(List<Task> tasks) {
        return tasks.stream()
                .map(this::toTaskDto)
                .collect(Collectors.toList());
    }

    public List<Task> toTaskList(List<TaskDto> tasks) {
        return tasks.stream()
                .map(this::toTask)
                .collect(Collectors.toList());
    }
}