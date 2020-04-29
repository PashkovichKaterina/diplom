import React from 'react';
import Answer from "./Answer";

class AnswerList extends React.PureComponent {
    render() {
        return (
            <div className="col-6 m-0">
                <Answer/>
                <Answer/>
                <Answer/>
                <Answer/>
                <Answer/>
            </div>
        )
    }
}

export default AnswerList;