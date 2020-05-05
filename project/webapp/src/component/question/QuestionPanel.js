import React from 'react';
import "./question.css"

class QuestionPanel extends React.PureComponent {
    render() {
        return (
            <div className="row">
                <div className="col-12 mt-2 mb-2">
                    <div className="question-block">
                        <p className="question-content">Violent crime is one of the ___ of modern society.</p>
                    </div>
                </div>
            </div>
        )
    }
}

export default QuestionPanel;