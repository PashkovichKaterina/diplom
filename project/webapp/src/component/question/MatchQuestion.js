import React from 'react';
import "./question.css"
import ProgressPanel from "./answer/ProgressPanel";
import QuestionHeader from "./QuestionHeader";
import QuestionPanel from "./QuestionPanel";
import GiveAnswerPanel from "./answer/GiveAnswerPanel";
import ResultPanel from "./answer/ResultPanel";
import AnswerList from "./answer/AnswerList";

class MatchQuestion extends React.PureComponent {
    render() {
        return (
            <div className="container question-wrapper">
                <ProgressPanel/>
                <QuestionHeader/>
                <div className="row">
                    <AnswerList/>
                    <AnswerList/>
                </div>
            </div>
        )
    }
}

export default MatchQuestion;