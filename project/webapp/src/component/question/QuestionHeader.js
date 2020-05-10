import React from 'react';
import "./question.css"
import Util from "../../service/Util";

class QuestionHeader extends React.PureComponent {
    render() {
        const {topicTitle, questionTitle} = this.props;
        return (
            <div>
                <div className="question-header">{questionTitle && questionTitle.toUpperCase()}</div>
                <div className="question-topic-header">{topicTitle && Util.capitalize(topicTitle)}</div>
            </div>
        )
    }
}

export default QuestionHeader;