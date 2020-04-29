import React from 'react';
import Topic from "./Topic";

class TopicList extends React.PureComponent {
    render() {
        return (
            <div className="row">
                <Topic/>
                <Topic/>
                <Topic/>
                <Topic/>
                <Topic/>
                <Topic/>
                <Topic/>
            </div>
        )
    }
}

export default TopicList;