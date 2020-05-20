package by.bsu.pashkovich.convertion;

import by.bsu.pashkovich.dto.UserDto;
import by.bsu.pashkovich.entity.user.Student;
import by.bsu.pashkovich.entity.user.User;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class UserConverter {
    public User toUser(UserDto userDto) {
        User user = null;
        if (userDto != null) {
            user = new User();
            user.setLogin(userDto.getLogin());
            user.setEmail(userDto.getEmail());
            user.setPassword(userDto.getPassword());
            if (userDto.getName() != null || userDto.getSurname() != null) {
                Student student = new Student(user);
                student.setName(userDto.getName());
                student.setSurname(userDto.getSurname());
            }
        }
        return user;
    }

    public UserDto toUserDto(User user) {
        UserDto userDto = null;
        if (user != null) {
            userDto = new UserDto();
            userDto.setId(user.getId());
            userDto.setLogin(user.getLogin());
            userDto.setEmail(user.getEmail());
            userDto.setPassword(user.getPassword());
            if (user.getClass() == Student.class) {
                userDto.setName(((Student) user).getName());
                userDto.setSurname(((Student) user).getSurname());
            }
        }
        return userDto;
    }

    public List<UserDto> toUserDtoList(List<User> user) {
        return user.stream().map(this::toUserDto).collect(Collectors.toList());
    }
}
