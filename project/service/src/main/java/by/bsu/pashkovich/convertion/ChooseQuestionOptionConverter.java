package by.bsu.pashkovich.convertion;

import by.bsu.pashkovich.dto.question.ChooseQuestionOptionDto;
import by.bsu.pashkovich.entity.question.ChooseQuestionOption;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class ChooseQuestionOptionConverter {
    public ChooseQuestionOption toChooseQuestionOption(ChooseQuestionOptionDto questionAnswerDto) {
        ChooseQuestionOption questionOption = null;
        if (questionAnswerDto != null) {
            questionOption = new ChooseQuestionOption();
            questionOption.setId(questionAnswerDto.getId());
            questionOption.setValue(questionAnswerDto.getTitle());
            questionOption.setStatus(questionAnswerDto.getStatus());
        }
        return questionOption;
    }

    public ChooseQuestionOptionDto toChooseQuestionOptionDto(ChooseQuestionOption questionOption) {
        ChooseQuestionOptionDto questionOptionDto = null;
        if (questionOption != null) {
            questionOptionDto = new ChooseQuestionOptionDto();
            questionOptionDto.setId(questionOption.getId());
            questionOptionDto.setTitle(questionOption.getValue());
            questionOptionDto.setStatus(questionOption.getStatus());
        }
        return questionOptionDto;
    }

    public List<ChooseQuestionOptionDto> toChooseQuestionOptionDtoList(List<ChooseQuestionOption> questionOptions) {
        return questionOptions.stream()
                .map(this::toChooseQuestionOptionDto)
                .collect(Collectors.toList());
    }

    public List<ChooseQuestionOption> toChooseQuestionOptionList(List<ChooseQuestionOptionDto> tasks) {
        return tasks.stream()
                .map(this::toChooseQuestionOption)
                .collect(Collectors.toList());
    }
}
