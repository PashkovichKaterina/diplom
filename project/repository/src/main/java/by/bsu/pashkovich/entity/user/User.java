package by.bsu.pashkovich.entity.user;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Inheritance;
import javax.persistence.InheritanceType;
import javax.persistence.PrePersist;
import javax.persistence.Table;

@Entity
@Table(name = "users")
@Inheritance(strategy = InheritanceType.JOINED)
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String login;

    @Column
    private String email;

    @Column
    private String password;

    @Column
    private String refreshToken;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private UserRole role;

    @PrePersist
    public void setDefaultUserRole() {
        role = UserRole.STUDENT;
    }

    public Long getId() {
        return id;
    }

    public String getLogin() {
        return login;
    }

    public String getEmail() {
        return email;
    }

    public String getPassword() {
        return password;
    }

    public UserRole getRole() {
        return role;
    }

    public String getRefreshToken() {
        return refreshToken;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setLogin(String login) {
        this.login = login;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setRole(UserRole role) {
        this.role = role;
    }

    public void setRefreshToken(String refreshToken) {
        this.refreshToken = refreshToken;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) {
            return true;
        }
        if (obj == null || getClass() != obj.getClass()) {
            return false;
        }
        User user = (User) obj;
        return (id == null ? id == user.id : id.equals(user.id))
                && (login == null ? login == user.login : login.equals(user.login))
                && (email == null ? email == user.email : email.equals(user.email))
                && (role == null ? role == user.role : role.equals(user.role));
    }

    @Override
    public int hashCode() {
        return (id == null ? 0 : id.hashCode()) + (login == null ? 0 : login.hashCode())
                + (email == null ? 0 : email.hashCode()) + (role == null ? 0 : role.hashCode())
                + (refreshToken == null ? 0 : refreshToken.hashCode());
    }

    @Override
    public String toString() {
        return getClass().getName() + "@ID=" + id + ";LOGIN=" + login + ";EMAIL=" + email + ";ROLE=" + role;
    }
}
