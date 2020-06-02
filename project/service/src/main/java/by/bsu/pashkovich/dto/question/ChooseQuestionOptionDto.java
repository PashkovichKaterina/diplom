package by.bsu.pashkovich.dto.question;

public class ChooseQuestionOptionDto {
    private Long id;
    private String title;
    private Boolean status;
    public ChooseQuestionOptionDto(){}

    public Long getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public Boolean getStatus() {
        return status;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setStatus(Boolean status) {
        this.status = status;
    }
    @Override
    public String toString() {
        return "ID=" + id + "VALUE=" + title + "STATUS=" + status;
    }
}
