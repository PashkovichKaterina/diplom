import React from 'react';
import "./option.css"
import Option from "./Option";

class OptionList extends React.PureComponent {
    render() {
        return (
            <div className="row">
                <Option/>
                <Option/>
                <Option/>
            </div>
        )
    }
}

export default OptionList;