package by.bsu.pashkovich.security;

import by.bsu.pashkovich.security.jwt.JwtFilterManager;
import by.bsu.pashkovich.security.jwt.JwtTokenProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@Configuration
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class SecurityConfiguration extends WebSecurityConfigurerAdapter {
    private static final String LOGIN_ENDPOINT = "/english2C/login";
    private static final String SIGNUP_ENDPOINT = "/english2C/signup";
    private static final String REFRESH_TOKEN_ENDPOINT = "/english2C/refreshToken";

    private final JwtTokenProvider jwtTokenProvider;
    private final SecurityUserDetailsService userDetailsService;

    @Autowired
    public SecurityConfiguration(JwtTokenProvider jwtTokenProvider, SecurityUserDetailsService userDetailsService) {
        this.jwtTokenProvider = jwtTokenProvider;
        this.userDetailsService = userDetailsService;
    }

    @Bean
    @Override
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }

    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .httpBasic().disable()
                .csrf().disable()
                .authorizeRequests()

                .antMatchers(LOGIN_ENDPOINT).permitAll()
                .antMatchers(SIGNUP_ENDPOINT).permitAll()
                .antMatchers(REFRESH_TOKEN_ENDPOINT).permitAll()

                .antMatchers("/english2C/**").hasRole("USER")


                .antMatchers(LOGIN_ENDPOINT).permitAll()
                .antMatchers(SIGNUP_ENDPOINT).permitAll()
                .antMatchers(REFRESH_TOKEN_ENDPOINT).permitAll()

                .anyRequest().permitAll()
                .and()
                .apply(new JwtFilterManager(jwtTokenProvider));
    }
}