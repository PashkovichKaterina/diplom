package by.bsu.pashkovich.repository;

import by.bsu.pashkovich.entity.user.User;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

public interface UserRepository extends CrudRepository<User, Long> {
    @Query("select user from User user where user.login = :login")
    User getByLogin(@Param("login") String login);

    @Query("select user from User user where user.email = :email")
    User getByEmail(@Param("email") String email);
}
