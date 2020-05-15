package by.bsu.pashkovich.repository;

import by.bsu.pashkovich.entity.user.Score;
import by.bsu.pashkovich.entity.user.ScoreKey;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface ScoreRepository extends CrudRepository<Score, ScoreKey> {
    @Query(value = "select * from getUserStatusByTask(:userId, :taskId)", nativeQuery = true)
    String getUserStatusByTask(@Param("userId") Long userId, @Param("taskId") Long taskId);

    @Query(value = "select * from getUserStatusByTopic(:userId, :topicId)", nativeQuery = true)
    String getUserStatusByTopic(@Param("userId") Long userId, @Param("topicId") Long topicId);
}