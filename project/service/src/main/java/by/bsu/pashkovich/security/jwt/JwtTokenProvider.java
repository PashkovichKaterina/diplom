package by.bsu.pashkovich.security.jwt;

import by.bsu.pashkovich.security.SecurityUserDetailsService;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import javax.servlet.http.HttpServletRequest;
import java.util.Base64;
import java.util.Date;

@Component
@PropertySource("security.properties")
public class JwtTokenProvider {
    public static final String BEARER = "Bearer";

    @Value("${secret}")
    private String secret;

    @Value("${accessTokenExpiration}")
    private long accessExpiration;

    @Value("${refreshTokenExpiration}")
    private long refreshExpiration;

    private SecurityUserDetailsService userDetailsService;

    @Autowired
    public JwtTokenProvider(SecurityUserDetailsService userDetailsService) {
        this.userDetailsService = userDetailsService;
    }

    @PostConstruct
    protected void init() {
        secret = Base64.getEncoder().encodeToString(secret.getBytes());
    }

    public String getAccessToken(Long id, String login, String role, String name, String surname) {
        return createToken(id, login, role, name, surname, accessExpiration);
    }

    public String getRefreshToken(Long id, String login, String role, String name, String surname) {
        return createToken(id, login, role, name, surname, refreshExpiration);
    }

    private String createToken(Long id, String login, String role, String name, String surname, Long expiration) {
        Claims claims = Jwts.claims().setSubject(id.toString());
        claims.put("login", login);
        claims.put("role", role);
        claims.put("name", name);
        claims.put("surname", surname);

        Date createdJwtDate = new Date();
        Date validityJwtDate = new Date(createdJwtDate.getTime() + expiration);
        return Jwts.builder()
                .setClaims(claims)
                .setIssuedAt(createdJwtDate)
                .setExpiration(validityJwtDate)
                .signWith(SignatureAlgorithm.HS256, secret)
                .compact();
    }

    public Authentication getAuthentication(String token) {
        UserDetails userDetails = this.userDetailsService.loadUserByUsername(getUsername(token));
        return new UsernamePasswordAuthenticationToken(userDetails, "", userDetails.getAuthorities());
    }

    public String getUsername(String token) {
        return (String) Jwts.parser().setSigningKey(secret).parseClaimsJws(token).getBody().get("login");
    }

    public String resolveToken(HttpServletRequest req) {
        String bearerToken = req.getHeader("Authorization");
        if (bearerToken != null && bearerToken.startsWith(BEARER)) {
            return bearerToken.substring(BEARER.length() + 1);
        }
        return null;
    }

    public boolean validateToken(String token) {
        Jws<Claims> claims = Jwts.parser().setSigningKey(secret).parseClaimsJws(token);
        return !claims.getBody().getExpiration().before(new Date());
    }
}
