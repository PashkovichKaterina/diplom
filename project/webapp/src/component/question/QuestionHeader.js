import React from 'react';
import "./question.css"
import Util from "../../logic/Util";
import {faQuestionCircle} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Message from "../../logic/Message";

const QuestionHeader = (props) => {
    const {topicTitle, questionTitle, questionType} = props;
    return (
        <div>
            <div className="question-header">
                <span>{questionTitle && questionTitle.toUpperCase()}</span>
                <span title={Message.getString(questionType)}>&nbsp;
                        <FontAwesomeIcon icon={faQuestionCircle} className="question-icon"/>
                    </span>
            </div>
            <div className="question-topic-header">{topicTitle && Util.capitalize(topicTitle)}</div>
        </div>
    )
};

export default QuestionHeader;