package by.bsu.pashkovich.convertion;

import by.bsu.pashkovich.dto.question.ChooseQuestionAnswerDto;
import by.bsu.pashkovich.entity.question.ChooseQuestionAnswer;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class ChooseQuestionAnswerConverter {
    /*public ChooseQuestionAnswer toTask(ChooseQuestionAnswerDto questionAnswerDto) {
        ChooseQuestionAnswer questionAnswer = null;
        if (questionAnswerDto != null) {
            questionAnswer = new ChooseQuestionAnswer();
            questionAnswer.se(questionAnswerDto.getId());
            task.setTitle(questionAnswerDto.getTitle());
            task.setType(questionAnswerDto.getType());
        }
        return task;
    }*/

    public ChooseQuestionAnswerDto toChooseQuestionAnswerDto(ChooseQuestionAnswer questionAnswer) {
        ChooseQuestionAnswerDto questionAnswerDto = null;
        if (questionAnswer != null) {
            questionAnswerDto = new ChooseQuestionAnswerDto();
            questionAnswerDto.setId(questionAnswer.getKey().getOption().getId());
            questionAnswerDto.setTitle(questionAnswer.getKey().getOption().getTitle());
            questionAnswerDto.setStatus(questionAnswer.getStatus());
        }
        return questionAnswerDto;
    }

    public List<ChooseQuestionAnswerDto> toChooseQuestionAnswerDtoList(List<ChooseQuestionAnswer> questionAnswers) {
        return questionAnswers.stream()
                .map(this::toChooseQuestionAnswerDto)
                .collect(Collectors.toList());
    }

    /*public List<Task> toTaskList(List<TaskDto> tasks) {
        return tasks.stream()
                .map(this::toTask)
                .collect(Collectors.toList());
    }*/
}
