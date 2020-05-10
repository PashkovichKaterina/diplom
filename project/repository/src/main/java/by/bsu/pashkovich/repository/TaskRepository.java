package by.bsu.pashkovich.repository;

import by.bsu.pashkovich.entity.Task;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface TaskRepository extends CrudRepository<Task, Long> {
    @Query("select task from Task task where task.id = :taskId")
    Task getTaskByIdAndTopicId(@Param("taskId") Long taskId);
}
