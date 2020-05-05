package by.bsu.pashkovich.entity.user;

import javax.persistence.*;

@Entity
@Table(name = "user_details")
public class Student extends User {
    @Column
    private String name;

    @Column
    private String surname;
}
