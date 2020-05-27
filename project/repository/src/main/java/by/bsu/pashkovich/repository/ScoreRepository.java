package by.bsu.pashkovich.repository;

import by.bsu.pashkovich.entity.user.Score;
import by.bsu.pashkovich.entity.user.ScoreKey;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ScoreRepository extends CrudRepository<Score, ScoreKey> {
    @Query(value = "select * from getUserStatusByTopic(:userId, :topicId)", nativeQuery = true)
    String getUserStatusByTopic(@Param("userId") Long userId, @Param("topicId") Long topicId);

    @Query("select score from Score score where scoreKey.student.id = :userId and scoreKey.task.id = :taskId")
    Score getScoreByUserAndTask(@Param("userId") Long userId, @Param("taskId") Long taskId);

    @Query("select score from Score score where scoreKey.topic.id = :topicId")
    List<Score> getScoreByTopic(@Param("topicId") Long topicId, Sort sort);

    @Query(value = "select value from scores where user_id = :studentId and task_id = :taskId order by passage_date desc limit 1", nativeQuery = true)
    Double getLastUserScoreByTask(@Param("studentId") Long studentId, @Param("taskId") Long taskId);
}