package by.bsu.pashkovich.security;

import by.bsu.pashkovich.entity.user.User;
import by.bsu.pashkovich.exception.authentication.AuthenticationException;
import by.bsu.pashkovich.repository.StudentRepository;
import by.bsu.pashkovich.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class SecurityUserDetailsService implements UserDetailsService {
    private UserRepository userRepository;
    private StudentRepository studentRepository;

    @Autowired
    public SecurityUserDetailsService(UserRepository userRepository, StudentRepository studentRepository) {
        this.userRepository = userRepository;
        this.studentRepository = studentRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.getByLogin(username);
        user = user == null ? studentRepository.getByLogin(username) : user;
        if (user == null) {
            throw new AuthenticationException("");
        }
        return SecurityUserMapper.create(user);
    }
}
