package by.bsu.pashkovich.controller;

import by.bsu.pashkovich.dto.PageDto;
import by.bsu.pashkovich.dto.PageRequest;
import by.bsu.pashkovich.dto.TopicDto;
import by.bsu.pashkovich.service.TopicService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.hateoas.Link;
import org.springframework.hateoas.server.mvc.WebMvcLinkBuilder;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/english2C/topics")
public class TopicController {
    private TopicService topicService;

    @Autowired
    public TopicController(TopicService topicService) {
        this.topicService = topicService;
    }

    @GetMapping
    public ResponseEntity getTopicsByCourseNumber(Long course, PageRequest pageRequest, String topicTitle) {
        List<TopicDto> topics;
        if (topicTitle != null) {
            topics = topicService.getTopicsByTitle(topicTitle);
            return new ResponseEntity<>(topics, HttpStatus.OK);
        }
        if (pageRequest.getPage() == null) {
            topics = topicService.getTopicsByCourse(course);
            return new ResponseEntity<>(topics, HttpStatus.OK);
        } else {
            int page = Integer.parseInt(pageRequest.getPage());
            int perPage = Integer.parseInt(pageRequest.getSize());
            PageDto<TopicDto> topicPage = topicService.getTopicsByCourse(course, page, perPage);
            MultiValueMap<String, String> headers = new LinkedMultiValueMap<>();
            headers.add("Link", getLinkHead(topicPage));
            topics = topicPage.getElements();
            return new ResponseEntity<>(topics, headers, HttpStatus.OK);
        }
    }

    @PostMapping
    public ResponseEntity createTopic(@RequestBody TopicDto topicDto){
        topicService.save(topicDto);
        return null;
    }

    @GetMapping("/{id}")
    public ResponseEntity getTopicById(@PathVariable("id") Long id) {
        return new ResponseEntity<>(topicService.getTopicById(id), HttpStatus.OK);
    }

    @GetMapping("/{topicId}/tasks/{taskId}")
    public ResponseEntity getTopicTask(@PathVariable("topicId") Long topicId,
                                       @PathVariable("taskId") Long taskId) {
        return new ResponseEntity<>(topicService.getTopicTask(topicId, taskId), HttpStatus.OK);
    }

    @GetMapping("/{id}/scores")
    public ResponseEntity getScoresByTopic(@PathVariable("id") Long topicId) {
        return new ResponseEntity<>(topicService.getScoresByTopic(topicId), HttpStatus.OK);
    }

    private String getLinkHead(PageDto page) {
        String result = getLink(1, page.getSize(), "first");
        result += "," + getLink(page.getTotalPages(), page.getSize(), "last");
        result += page.hasNext() ? "," + getLink((page.next()), page.getSize(), "next") : "";
        result += page.hasPrevious() ? "," + getLink((page.previous()), page.getSize(), "prev") : "";
        return result;
    }

    private String getLink(Integer page, Integer size, String rel) {
        String link = WebMvcLinkBuilder.linkTo(TopicController.class)
                .toUriComponentsBuilder()
                .path("?page={page}&size={size}")
                .buildAndExpand(page, size).toString();
        return new Link(link).withRel(rel).toString();
    }
}
