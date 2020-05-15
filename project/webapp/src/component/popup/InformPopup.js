import React from 'react';
import "./popup.css"

const ResultPopup = (props) => {
    return (
        <div className="result-popup">
            <div className="result-popup-wrapper">
                <div>
                    {props.status}
                </div>
            </div>
        </div>
    )
};

export default ResultPopup;