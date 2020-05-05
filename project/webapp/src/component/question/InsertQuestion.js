import React from 'react';
import "./question.css"
import ProgressPanel from "./answer/ProgressPanel";
import QuestionHeader from "./QuestionHeader";
import QuestionPanel from "./QuestionPanel";
import ResultPanel from "./answer/ResultPanel";
import GiveAnswerPanel from "./answer/GiveAnswerPanel";

class InsertQuestion extends React.PureComponent {
    render() {
        return (
            <div>
                <div className="container question-wrapper">
                    <ProgressPanel/>
                    <QuestionHeader/>
                    <QuestionPanel/>
                    <GiveAnswerPanel/>
                </div>
                <ResultPanel/>
            </div>
        )
    }
}

export default InsertQuestion;