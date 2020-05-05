package by.bsu.pashkovich.security;

import by.bsu.pashkovich.entity.user.User;
import by.bsu.pashkovich.exception.authentication.AuthenticationException;
import by.bsu.pashkovich.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class SecurityUserDetailsService implements UserDetailsService {
    private UserRepository userRepository;

    @Autowired
    public SecurityUserDetailsService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.getByLogin(username);
        if (user == null){
            throw new AuthenticationException("fghjk");
        }
        return SecurityUserMapper.create(user);
    }
}
