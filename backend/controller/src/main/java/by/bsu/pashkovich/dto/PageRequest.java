package by.bsu.pashkovich.dto;

public class PageRequest {
    private static final String DEFAULT_PAGE_NUMBER = "1";
    private static final String DEFAULT_PER_PAGE_NUMBER = "6";

    private String page;
    private String size;

    public PageRequest() {
        this.size = DEFAULT_PER_PAGE_NUMBER;
    }

    public String getPage() {
        return page;
    }

    public String getSize() {
        return size;
    }

    public void setPage(String page) {
        if (page != null) {
            this.page = page.trim().isEmpty() ? DEFAULT_PAGE_NUMBER : page.trim();
        }
    }

    public void setSize(String size) {
        this.size = (size == null || size.trim().isEmpty()) ? DEFAULT_PER_PAGE_NUMBER : size.trim();
    }
}
