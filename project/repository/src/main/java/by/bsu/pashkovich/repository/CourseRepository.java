package by.bsu.pashkovich.repository;

import by.bsu.pashkovich.entity.Course;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface CourseRepository extends CrudRepository<Course, Long> {
    @Query("select case when count(course)>0 then true else false end from Course course where course.number = :number")
    boolean existsByNumber(@Param("number") Long number);
}
