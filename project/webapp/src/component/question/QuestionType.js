import React from "react";
import MatchQuestionContainer from "./MatchQuestionContainer";
import ChooseQuestionContainer from "./ChooseQuestionContainer";
import AnswerQuestionContainer from "./AnswerQuestionContainer";

const QuestionType = {
    "MATCH": <MatchQuestionContainer/>,
    "CHOOSE": <ChooseQuestionContainer/>,
    "ANSWER": <AnswerQuestionContainer/>
};

export default QuestionType;