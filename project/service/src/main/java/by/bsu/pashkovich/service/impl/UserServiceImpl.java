package by.bsu.pashkovich.service.impl;

import by.bsu.pashkovich.convertion.UserConverter;
import by.bsu.pashkovich.dto.ScoreDto;
import by.bsu.pashkovich.dto.TokenDto;
import by.bsu.pashkovich.dto.UserDto;
import by.bsu.pashkovich.entity.user.Score;
import by.bsu.pashkovich.entity.user.Student;
import by.bsu.pashkovich.entity.user.User;
import by.bsu.pashkovich.entity.user.UserRole;
import by.bsu.pashkovich.exception.authentication.RefreshTokenException;
import by.bsu.pashkovich.exception.authentication.SignupException;
import by.bsu.pashkovich.exception.entity.NoSuchEntityException;
import by.bsu.pashkovich.repository.*;
import by.bsu.pashkovich.security.SecurityUser;
import by.bsu.pashkovich.security.jwt.JwtTokenProvider;
import by.bsu.pashkovich.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {
    private UserRepository userRepository;
    private AuthenticationManager authenticationManager;
    private JwtTokenProvider jwtTokenProvider;
    private BCryptPasswordEncoder bCryptPasswordEncoder;
    private UserConverter userConverter;
    private ScoreRepository scoreRepository;
    private TopicRepository topicRepository;
    private TaskRepository taskRepository;
    private StudentRepository studentRepository;

    @Autowired
    public UserServiceImpl(UserRepository userRepository, AuthenticationManager authenticationManager,
                           JwtTokenProvider jwtTokenProvider, BCryptPasswordEncoder bCryptPasswordEncoder,
                           UserConverter userConverter, ScoreRepository scoreRepository,
                           TopicRepository topicRepository, TaskRepository taskRepository,
                           StudentRepository studentRepository) {
        this.userRepository = userRepository;
        this.authenticationManager = authenticationManager;
        this.jwtTokenProvider = jwtTokenProvider;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
        this.userConverter = userConverter;
        this.scoreRepository = scoreRepository;
        this.topicRepository = topicRepository;
        this.taskRepository = taskRepository;
        this.studentRepository = studentRepository;
    }

    @Override
    public TokenDto login(String login, String password) {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(login, password));
        User user = userRepository.getByLogin(login);
        return setToken(user);
    }

    @Override
    @Transactional
    public UserDto signup(UserDto userDto) {
        User user = userConverter.toUser(userDto);
        String loginMessage = userRepository.getByLogin(user.getLogin()) != null ? " login " + user.getLogin() : "";
        String emailMessage = userRepository.getByEmail(user.getEmail()) != null ? " email " + user.getEmail() : "";
        if (!loginMessage.isEmpty() && !emailMessage.isEmpty()) {
            throw new SignupException("repeatLoginAndEmail", "User with" + loginMessage + emailMessage + " is already exist");
        }
        if (!loginMessage.isEmpty()) {
            throw new SignupException("repeatLogin", "User with" + loginMessage + " is already exist");
        }
        if (!emailMessage.isEmpty()) {
            throw new SignupException("repeatEmail", "User with" + emailMessage + " is already exist");
        }
        user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
        Student student = new Student(user);
        Student createdStudent = studentRepository.save(student);
        return userConverter.toUserDto(createdStudent);
    }

    @Override
    public TokenDto refreshToken(TokenDto tokenDto) {
        Optional<User> user = userRepository.findById(tokenDto.getUserId());
        if (!user.isPresent() || user.get().getRefreshToken() == null
                || !user.get().getRefreshToken().equals(tokenDto.getRefreshToken())) {
            throw new RefreshTokenException("");
        }
        return setToken(user.get());
    }

    @Override
    public void saveScore(ScoreDto scoreDto) {
        Score score = new Score();
        Long userId = ((SecurityUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getId();
        score.setUser(userRepository.findById(userId).get());
        score.setTopic(topicRepository.findById(scoreDto.getTopicId()).get());
        score.setTask(taskRepository.findById(scoreDto.getTaskId()).get());
        score.setValue(scoreDto.getValue());
        scoreRepository.save(score);
    }

    @Override
    public void editStudentData(UserDto userDto) {
        Long userId = ((SecurityUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getId();
        Optional<Student> user = studentRepository.findById(userId);
        if (user.isPresent()) {
            Student student = user.get();
            student.setName(userDto.getName());
            student.setSurname(userDto.getSurname());
            studentRepository.save(student);
            return;
        }
        throw new NoSuchEntityException("");
    }

    private TokenDto setToken(User user) {
        Long id = user.getId();
        String login = user.getLogin();
        UserRole role = user.getRole();
        String surname = null;
        String name = null;
        if (user.getClass() == Student.class) {
            Student student = (Student) user;
            surname = student.getSurname();
            name = student.getName();
        }
        System.out.println(name);
        String accessToken = jwtTokenProvider.getAccessToken(id, login, role.toString(), name, surname);
        String refreshToken = jwtTokenProvider.getRefreshToken(id, login, role.toString(), name, surname);
        user.setRefreshToken(refreshToken);
        userRepository.save(user);
        return new TokenDto(accessToken, refreshToken);
    }
}
