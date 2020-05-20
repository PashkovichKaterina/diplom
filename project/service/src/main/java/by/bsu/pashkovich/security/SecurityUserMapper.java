package by.bsu.pashkovich.security;

import by.bsu.pashkovich.entity.user.Student;
import by.bsu.pashkovich.entity.user.User;
import by.bsu.pashkovich.entity.user.UserRole;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.util.ArrayList;
import java.util.List;

public final class SecurityUserMapper {
    public static SecurityUser create(User user) {
        Long id = user.getId();
        String login = user.getLogin();
        String email = user.getEmail();
        String password = user.getPassword();
        UserRole role = user.getRole();
        String name = null;
        String surname = null;
        if (user.getClass() == Student.class) {
            Student student = (Student) user;
            name = student.getName();
            surname = student.getSurname();
        }
        return new SecurityUser(id, login, email, password, name, surname, mapToGrantedAuthorities(role));
    }

    private static List<GrantedAuthority> mapToGrantedAuthorities(UserRole userRole) {
        List<GrantedAuthority> grantedAuthority = new ArrayList<>();
        grantedAuthority.add(new SimpleGrantedAuthority("ROLE_" + userRole.toString()));
        return grantedAuthority;
    }
}