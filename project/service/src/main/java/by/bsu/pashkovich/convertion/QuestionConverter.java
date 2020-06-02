package by.bsu.pashkovich.convertion;

import by.bsu.pashkovich.dto.question.ChooseQuestionDto;
import by.bsu.pashkovich.dto.question.ChooseQuestionOptionDto;
import by.bsu.pashkovich.dto.question.QuestionDto;
import by.bsu.pashkovich.entity.question.ChooseQuestion;
import by.bsu.pashkovich.entity.question.ChooseQuestionOption;
import by.bsu.pashkovich.entity.question.Question;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class QuestionConverter {

    private ModelMapper mapper;
    private ChooseQuestionOptionConverter optionConverter;

    @Autowired
    public QuestionConverter(ModelMapper mapper, ChooseQuestionOptionConverter optionConverter) {
        this.mapper = mapper;
        this.optionConverter = optionConverter;
    }

    public Question toQuestion(QuestionDto questionDto) {
        Question question = null;
        if (questionDto != null) {
            String className = questionDto.getClass().getSimpleName();
            className = className.substring(0, className.length() - 3);
            Class questionClass = null;
            try {
                questionClass = Class.forName("by.bsu.pashkovich.entity.question." + className);
            } catch (Exception e) {
            }
            question = (Question) mapper.map(questionDto, questionClass);
            if(questionDto.getClass()== ChooseQuestionDto.class){
                ChooseQuestion chooseQuestion =(ChooseQuestion) question;
                List<ChooseQuestionOptionDto> optionDtoList = ((ChooseQuestionDto) questionDto).getAnswers();
                chooseQuestion.setOptions(optionConverter.toChooseQuestionOptionList(optionDtoList));
            }
        }
        return question;
    }

    public QuestionDto toQuestionDto(Question question) {
        QuestionDto questionDto = null;
        if (question != null) {
            String className = question.getClass().getSimpleName();
            className = className + "Dto";
            Class questionClass = null;
            try {
                questionClass = Class.forName("by.bsu.pashkovich.dto.question." + className);
            } catch (Exception e) {
            }
            questionDto = (QuestionDto) mapper.map(question, questionClass);
            if (question.getClass() == ChooseQuestion.class) {
                ChooseQuestionDto chooseQuestionDto = (ChooseQuestionDto) questionDto;
                List<ChooseQuestionOption> optionList = ((ChooseQuestion) question).getOptions();
                chooseQuestionDto.setAnswers(optionConverter.toChooseQuestionOptionDtoList(optionList));
            }
        }
        return questionDto;
    }

    public List<Question> toQuestionList(List<QuestionDto> questionDto) {
        return questionDto.stream()
                .map(this::toQuestion)
                .collect(Collectors.toList());
    }

    public List<QuestionDto> toQuestionDtoList(List<Question> question) {
        return question.stream()
                .map(this::toQuestionDto)
                .collect(Collectors.toList());
    }
}
