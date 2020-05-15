package by.bsu.pashkovich.convertion;

import by.bsu.pashkovich.dto.PageDto;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Component;

@Component
public class PageConverter {
    public PageDto toPageDto(Page page) {
        PageDto pageDto = null;
        if (page != null) {
            pageDto = new PageDto();
            pageDto.setSize(page.getSize());
            pageDto.setTotalPages(page.getTotalPages());
            pageDto.setCurrentPage(page.getNumber());
        }
        return pageDto;
    }
}
