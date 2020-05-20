package by.bsu.pashkovich.repository;

import by.bsu.pashkovich.entity.user.Student;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface StudentRepository extends CrudRepository<Student, Long> {
    @Query("select student from Student student where student.login = :login")
    Student getByLogin(@Param("login") String login);
}
