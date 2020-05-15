import React from 'react';
import "./question.css"

const QuestionPanel = (props) => {
    const {questionTitle} = props;
    return (
        <div className="row">
            <div className="col-12 mt-2 mb-2">
                <div className="question-block">
                    <p className="question-content">{questionTitle}</p>
                </div>
            </div>
        </div>
    )
};

export default QuestionPanel;