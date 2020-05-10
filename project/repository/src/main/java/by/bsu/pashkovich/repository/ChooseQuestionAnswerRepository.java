package by.bsu.pashkovich.repository;

import by.bsu.pashkovich.entity.question.ChooseQuestionAnswer;
import by.bsu.pashkovich.entity.question.ChooseQuestionAnswerKey;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ChooseQuestionAnswerRepository extends CrudRepository<ChooseQuestionAnswer, ChooseQuestionAnswerKey> {
    @Query("select answers from ChooseQuestionAnswer answers where answers.key.question.id = :questionId")
    List<ChooseQuestionAnswer> getByQuestionId(@Param("questionId") Long questionId);
}
