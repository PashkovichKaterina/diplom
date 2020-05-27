import React from 'react';
import "./admin.css";
import ResultLogic from "../../logic/ResultLogic";

const ResultTableRow = (props) => {
    const {user, scores} = props;
    const name = scores.attemptNumber === 1 && `${user.surname} ${user.name}`;
    const scoreElement = scores && scores.values.map(value =>
        <td>{(value.value || value.value === 0) ? value.value + "%" : "-"}</td>);
    return (
        <tr>
            <td className="text-left">{name}</td>
            <td>{scores.attemptNumber}</td>
            {scoreElement}
            <td>{ResultLogic.calculateTopicScore(scores.values)}%</td>
        </tr>
    )
};

export default ResultTableRow;