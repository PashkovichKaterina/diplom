import React from 'react';
import "./search.css"

const SearchPanel = (props) => {
    const {searchValue, handleSearch, handleOnChange} = props;
    return (
        <div className="search-wrapper">
            <div className="container-fluid search-block">
                <p className="search-title">ПОИСК ТЕМЫ</p>
                <form onSubmit={handleSearch}>
                    <div className="row">
                        <div className="col-8 text-right">
                            <input className="search-input" type="text"
                                   value={searchValue}
                                   onChange={handleOnChange}/>
                        </div>
                        <div className="col-4 text-left">
                            <button className="search-button" type="submit">Поиск</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
};

export default SearchPanel;