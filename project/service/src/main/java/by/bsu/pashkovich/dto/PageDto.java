package by.bsu.pashkovich.dto;

import by.bsu.pashkovich.exception.PageableException;

import java.util.List;

public class PageDto<T> {
    public static final Integer FIRST_PAGE_NUMBER = 1;

    private Integer size;
    private Integer currentPage;
    private Integer totalPages;
    private List<T> elements;

    public PageDto() {
    }

    public Integer getCurrentPage() {
        return currentPage;
    }

    public Integer getSize() {
        return size;
    }

    public Integer getTotalPages() {
        return totalPages;
    }

    public List<T> getElements() {
        return elements;
    }

    public void setCurrentPage(Integer currentPage) {
        this.currentPage = currentPage;
    }

    public void setSize(Integer size) {
        this.size = size;
    }

    public void setElements(List<T> elements) {
        this.elements = elements;
    }

    public void setTotalPages(Integer totalPages) {
        this.totalPages = totalPages;
    }

    public boolean hasNext() {
        return currentPage < totalPages;
    }

    public Integer next() {
        if (hasNext()) {
            return currentPage + 1;
        }
        throw new PageableException("");
    }

    public boolean hasPrevious() {
        return currentPage > FIRST_PAGE_NUMBER;
    }

    public Integer previous() {
        if (hasPrevious()) {
            return currentPage - 1;
        }
        throw new PageableException("");
    }
}
