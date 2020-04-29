import React from 'react';

class Header extends React.PureComponent {
    render() {
        return (
            <header className="container-fluid">
                <div className="row m-4">
                    <div className="col-6 site-title">SITENAME</div>
                    <ul className="col-6 text-right right-nav">
                        <li>Темы</li>
                        <li>Войти</li>
                    </ul>
                </div>
            </header>
        )
    }
}

export default Header;