package by.bsu.pashkovich.entity.user;

import javax.persistence.*;

@Entity
@Table(name = "user_details")
public class Student extends User implements Comparable<Student> {
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

    @Override
    public int compareTo(Student o) {
        int compare = surname.compareTo(o.surname);
        compare = compare == 0 ? name.compareTo(o.name) : compare;
        compare = compare == 0 ? getId().compareTo(o.getId()) : compare;
        return compare;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) {
            return true;
        }
        if (obj == null || getClass() != obj.getClass()) {
            return false;
        }
        Student student = (Student) obj;
        return super.equals(student) && (name == null ? name == student.name : name.equals(student.name))
                && (surname == null ? surname == student.surname : surname.equals(student.surname));
    }

    @Override
    public int hashCode() {
        return super.hashCode() + (name == null ? 0 : name.hashCode()) + (surname == null ? 0 : surname.hashCode());
    }

    @Override
    public String toString() {
        return super.toString() + ";SURNAME=" + surname + ";NAME=" + name;
    }
}
