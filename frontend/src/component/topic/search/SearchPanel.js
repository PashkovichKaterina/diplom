import React from 'react';
import "./search.css"

class SearchPanel extends React.PureComponent {
    render() {
        return (
            <div className="search-wrapper">
                <div className="container-fluid search-block">
                    <p className="search-title">ПОИСК ТЕМЫ</p>
                    <div className="row">
                        <div className="col-8 text-right">
                            <input  className="search-input" type="text"/>
                        </div>
                        <div className="col-4 text-left">
                            <button className="search-button">Поиск</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default SearchPanel;