import React from "react";
import MatchQuestion from "./MatchQuestion";
import ChooseQuestion from "./ChooseQuestion";
import AnswerQuestion from "./AnswerQuestion";

const QuestionType = {
    "MATCH": <MatchQuestion/>,
    "CHOOSE": <ChooseQuestion/>,
    "ANSWER": <AnswerQuestion/>
};

export default QuestionType;