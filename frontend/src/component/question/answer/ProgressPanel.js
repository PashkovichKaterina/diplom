import React from 'react';
import "../question.css"

class ProgressPanel extends React.PureComponent {
    render() {
        return (
            <div className="row question-top-panel">
                <div className="col-10 align-self-center">
                    <progress value="15" max="25" className="question-progress-panel"/>
                </div>
                <div className="col-2 align-self-center text-right">
                    <button className="question-close-button">
                        Закончить
                    </button>
                </div>
            </div>
        )
    }
}

export default ProgressPanel;