import React from 'react';
import "./question.css"

class QuestionPanel extends React.PureComponent {
    render() {
        const {questionTitle} = this.props;
        return (
            <div className="row">
                <div className="col-12 mt-2 mb-2">
                    <div className="question-block">
                        <p className="question-content">{questionTitle}</p>
                    </div>
                </div>
            </div>
        )
    }
}

export default QuestionPanel;