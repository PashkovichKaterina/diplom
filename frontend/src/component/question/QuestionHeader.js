import React from 'react';
import "./question.css"

class QuestionHeader extends React.PureComponent {
    render() {
        return (
            <div>
                <div className="question-header">CHOOSE THE DEFINITION</div>
                <div className="question-topic-header">Healthy and Happy</div>
            </div>
        )
    }
}

export default QuestionHeader;