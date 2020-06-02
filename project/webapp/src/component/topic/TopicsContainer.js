import React from 'react';
import SearchPanel from "../search/SearchPanel";
import Footer from "../general/Footer";
import HeaderContainer from "../general/HeaderContainer";
import TopicService from "../../service/TopicService";
import Course from "../course/Course";
import PaginationLogic from "../../logic/PaginationLogic";
import TopicContainer from "./TopicContainer";

class TopicsContainer extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            searchValue: ""
        }
    }

    componentDidMount() {
        this.setTopicList(1)
            .then(() => {
                this.setTopicList(2)
            })
            .then(() => {
                this.setTopicList(3)
            })
            .then(() => {
                this.setTopicList(4)
            })
    }

    setTopicList(courseNumber) {
        let firstPage;
        let lastPage;
        let courseList = `courseList${courseNumber}`;
        let isMore = `isMore${courseNumber}`;
        return TopicService.getTopicsByCourseNumberWithPagination(courseNumber)
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

    handleAddMoreClick = (event) => {
        const courseNumber = event.target.getAttribute("course_number");
        let courseList = `courseList${courseNumber}`;
        let isMore = `isMore${courseNumber}`;
        return TopicService.getTopicsByCourseNumber(courseNumber)
            .then(response => response.json())
            .then(json => this.setState({[courseList]: json, [isMore]: false}));
    };

    render() {
        console.log(this.state);
        const {courseList1, courseList2, courseList3, courseList4, isMore1, isMore2, isMore3, isMore4, searchValue, searchedTopicList} = this.state;
        const courses1 = (courseList1 && courseList1.length > 0) &&
            <Course courseNumber={1}
                    topics={courseList1}
                    isMore={isMore1}
                    handleAddMoreClick={this.handleAddMoreClick}/>;
        const courses2 = (courseList2 && courseList2.length > 0) &&
            <Course courseNumber={2}
                    topics={courseList2}
                    isMore={isMore2}
                    handleAddMoreClick={this.handleAddMoreClick}/>;
        const courses3 = (courseList3 && courseList3.length > 0) &&
            <Course courseNumber={3}
                    topics={courseList3}
                    isMore={isMore3}
                    handleAddMoreClick={this.handleAddMoreClick}/>;
        const courses4 = (courseList4 && courseList4.length > 0) &&
            <Course courseNumber={4}
                    topics={courseList4}
                    isMore={isMore4}
                    handleAddMoreClick={this.handleAddMoreClick}/>;
        const searchedTopics = searchedTopicList &&
            searchedTopicList.map(topic =>
                <TopicContainer key={topic.id}
                                id={topic.id}
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