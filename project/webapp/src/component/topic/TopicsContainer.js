import React from 'react';
import SearchPanel from "../search/SearchPanel";
import Footer from "../general/Footer";
import HeaderContainer from "../general/HeaderContainer";
import TopicService from "../../service/TopicService";
import Course from "../course/Course";
import PaginationLogic from "../../service/PaginationLogic";
import TopicContainer from "./TopicContainer";

class TopicsContainer extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            searchValue: ""
        }
    }

    componentDidMount() {
        this.setTopicList(1);
        this.setTopicList(2);
        this.setTopicList(3);
        this.setTopicList(4);
    }

    setTopicList(courseNumber) {
        let firstPage;
        let lastPage;
        let courseList = `courseList${courseNumber}`;
        let isMore = `isMore${courseNumber}`;
        TopicService.getTopicsByCourseNumber(courseNumber)
            .then(response => {
                const linkHeader = response.headers.get("link");
                const pageInfo = PaginationLogic.getPageInfoFromLinkHeader(linkHeader);
                firstPage = Number(pageInfo.first);
                lastPage = Number(pageInfo.last);
                return response.json()
            })
            .then(json => this.setState({[courseList]: json, [isMore]: lastPage > firstPage}));
    }

    handleOnChangeSearchValue = (event) => {
        this.setState({searchValue: event.target.value});
    };

    handleTopicSearch = (event) => {
        event.preventDefault();
        TopicService.getTopicsByTitle(this.state.searchValue)
            .then(response => response.json())
            .then(json => this.setState({searchedTopicList: json}));
    };

    render() {
        const {courseList1, courseList2, courseList3, courseList4, isMore1, isMore2, isMore3, isMore4, searchValue, searchedTopicList} = this.state;
        const courses1 = courseList1 &&
            <Course courseNumber={1}
                    topics={courseList1}
                    isMore={isMore1}/>;
        const courses2 = courseList2 &&
            <Course courseNumber={2}
                    topics={courseList2}
                    isMore={isMore2}/>;
        const courses3 = courseList3 &&
            <Course courseNumber={3}
                    topics={courseList3}
                    isMore={isMore3}/>;
        const courses4 = courseList4 &&
            <Course courseNumber={4}
                    topics={courseList4}
                    isMore={isMore4}/>;
        const searchedTopics = searchedTopicList &&
            searchedTopicList.map(topic =>
                <TopicContainer key={topic.id}
                                title={topic.title}
                                courseNumber={topic.courseNumber}
                                taskCount={topic.tasks.length}
                                status={topic.status}/>
            );
        const topicContent = (searchValue && searchedTopics)
            ? <div className="container course-wrapper">
                <div className="row">
                    {searchedTopics.length > 0 ? searchedTopics : "Поиск не дал результатов"}
                </div>
            </div>
            : <div>
                {courses1}
                {courses2}
                {courses3}
                {courses4}
            </div>;

        return (
            <div>
                <HeaderContainer isMain={true}/>
                <SearchPanel searchValue={searchValue}
                             handleOnChange={this.handleOnChangeSearchValue}
                             handleSearch={this.handleTopicSearch}/>
                {topicContent}
                <Footer/>
            </div>
        )
    }
}

export default TopicsContainer;