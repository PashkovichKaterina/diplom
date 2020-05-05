import React from 'react';
import "./question.css"
import ProgressPanel from "./answer/ProgressPanel";
import QuestionHeader from "./QuestionHeader";
import QuestionPanel from "./QuestionPanel";
import Options from "./option/Options";
import ResultPanel from "./answer/ResultPanel";

class ChooseQuestion extends React.PureComponent {
    render() {
        return (
            <div>
                <div className="container question-wrapper">
                    <ProgressPanel/>
                    <QuestionHeader/>
                    <QuestionPanel/>
                    <Options/>
                </div>
                <ResultPanel/>
            </div>
        )
    }
}

export default ChooseQuestion;