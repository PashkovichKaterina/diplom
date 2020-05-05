package by.bsu.pashkovich.service.impl;

import by.bsu.pashkovich.convertion.UserConverter;
import by.bsu.pashkovich.dto.TokenDto;
import by.bsu.pashkovich.dto.UserDto;
import by.bsu.pashkovich.entity.user.User;
import by.bsu.pashkovich.exception.authentication.RefreshTokenException;
import by.bsu.pashkovich.exception.authentication.SignupException;
import by.bsu.pashkovich.repository.UserRepository;
import by.bsu.pashkovich.security.jwt.JwtTokenProvider;
import by.bsu.pashkovich.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
public class UserServiceImpl implements UserService {
    private UserRepository userRepository;
    private AuthenticationManager authenticationManager;
    private JwtTokenProvider jwtTokenProvider;
    private BCryptPasswordEncoder bCryptPasswordEncoder;
    private UserConverter userConverter;

    @Autowired
    public UserServiceImpl(UserRepository userRepository, AuthenticationManager authenticationManager,
                           JwtTokenProvider jwtTokenProvider, BCryptPasswordEncoder bCryptPasswordEncoder,
                           UserConverter userConverter) {
        this.userRepository = userRepository;
        this.authenticationManager = authenticationManager;
        this.jwtTokenProvider = jwtTokenProvider;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
        this.userConverter = userConverter;
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
        User createdUser = userRepository.save(user);
        return userConverter.toUserDto(createdUser);
    }

    @Override
    public TokenDto refreshToken(TokenDto tokenDto) {
        String login = jwtTokenProvider.getUsername(tokenDto.getAccessToken());
        User user = userRepository.getByLogin(login);
        if (user == null || user.getRefreshToken() == null
                || !user.getRefreshToken().equals(tokenDto.getRefreshToken())) {
            throw new RefreshTokenException("");
        }
        return setToken(user);
    }

    private TokenDto setToken(User user) {
        String accessToken = jwtTokenProvider.getAccessToken(user.getId(), user.getLogin(), user.getRole().toString());
        String refreshToken = jwtTokenProvider.getRefreshToken(user.getId(), user.getLogin(), user.getRole().toString());
        user.setRefreshToken(refreshToken);
        userRepository.save(user);
        return new TokenDto(accessToken, refreshToken);
    }
}
