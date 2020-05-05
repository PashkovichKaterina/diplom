package by.bsu.pashkovich.security;

import by.bsu.pashkovich.entity.user.User;
import by.bsu.pashkovich.entity.user.UserRole;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.util.ArrayList;
import java.util.List;

public final class SecurityUserMapper {
    public static SecurityUser create(User user) {
        return new SecurityUser(user.getId(), user.getLogin(), user.getEmail(), user.getPassword(),
                mapToGrantedAuthorities(user.getRole()));
    }

    private static List<GrantedAuthority> mapToGrantedAuthorities(UserRole userRole) {
        List<GrantedAuthority> grantedAuthority = new ArrayList<>();
        grantedAuthority.add(new SimpleGrantedAuthority("ROLE_" + userRole.toString()));
        return grantedAuthority;
    }
}