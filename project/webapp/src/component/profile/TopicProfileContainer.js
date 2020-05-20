import React from 'react';
import "./profile.css"

class TopicProfileContainer extends React.PureComponent {
    render() {
        return (
            <div className="col-6">
                <div className="profile-topic">
                    <div className="profile-topic-title">HEALTH AND HAPPY</div>
                    <div className="profile-topic-tasks">Заданий: 3</div>
                    <div className="profile-topic-result">Ваш результат: 70%</div>
                </div>
            </div>
        )
    }
}

export default TopicProfileContainer;