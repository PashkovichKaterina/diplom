package by.bsu.pashkovich.entity.user;

import javax.persistence.*;

@Entity
@Table(name = "user_details")
public class Student extends User {
    @Column
    private String name;

    @Column
    private String surname;

    public Student() {

    }

    public Student(User user) {
        setId(user.getId());
        setLogin(user.getLogin());
        setEmail(user.getEmail());
        setPassword(user.getPassword());
    }

    public String getName() {
        return name;
    }

    public String getSurname() {
        return surname;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setSurname(String surname) {
        this.surname = surname;
    }
}
