package by.bsu.pashkovich.repository;

import by.bsu.pashkovich.entity.Topic;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TopicRepository extends CrudRepository<Topic, Long> {
    @Query("select topic from Topic topic where topic.course.number = :courseNumber")
    List<Topic> getTopicsByCourse(@Param("courseNumber") Long courseNumber);

    @Query("select topic from Topic topic where topic.course.number = :courseNumber")
    Page<Topic> getTopicsByCourse(@Param("courseNumber") Long courseNumber, Pageable pageable);

    @Query("select topic from Topic topic where upper(topic.title) like concat('%', upper(:topicTitle), '%') order by topic.course")
    List<Topic> getTopicsByTitle(@Param("topicTitle") String topicTitle);
}