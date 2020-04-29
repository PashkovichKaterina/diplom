import React from 'react';
import "./question.css"
import ProgressPanel from "./answer/ProgressPanel";
import QuestionHeader from "./QuestionHeader";
import QuestionPanel from "./QuestionPanel";
import GiveAnswerPanel from "./answer/GiveAnswerPanel";
import ResultPanel from "./answer/ResultPanel";

class AnswerQuestion extends React.PureComponent {
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

export default AnswerQuestion;