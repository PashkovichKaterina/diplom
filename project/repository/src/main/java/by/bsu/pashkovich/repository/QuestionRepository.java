package by.bsu.pashkovich.repository;

import by.bsu.pashkovich.entity.question.Question;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface QuestionRepository extends CrudRepository<Question, Long> {
}
