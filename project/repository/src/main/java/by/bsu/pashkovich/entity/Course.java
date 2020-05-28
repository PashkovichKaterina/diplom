package by.bsu.pashkovich.entity;

import javax.persistence.*;

@Entity
@Table(name = "courses")
public class Course {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private Long number;

    public Course() {
    }

    public Long getId() {
        return id;
    }

    public Long getNumber() {
        return number;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setNumber(Long number) {
        this.number = number;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) {
            return true;
        }
        if (obj == null || getClass() != obj.getClass()) {
            return false;
        }
        Course course = (Course) obj;
        return (id == null ? id == course.id : id.equals(course.id))
                && (number == null ? number == course.number : number.equals(course.number));
    }

    @Override
    public int hashCode() {
        return (id == null ? 0 : id.hashCode()) + (number == null ? 0 : number.hashCode());
    }

    @Override
    public String toString() {
        return getClass().getName() + "@ID=" + id + ";NUMBER=" + number;
    }
}
