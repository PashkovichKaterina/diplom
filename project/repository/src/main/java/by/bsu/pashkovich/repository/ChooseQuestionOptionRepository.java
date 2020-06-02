package by.bsu.pashkovich.repository;

import by.bsu.pashkovich.entity.question.ChooseQuestionOption;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ChooseQuestionOptionRepository extends CrudRepository<ChooseQuestionOption, Long> {
}
