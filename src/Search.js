import React from 'react';

class Search extends React.Component {
    render(){
        return(
            <div className="search">
                <div className="search-bar">
                    <div className="search-input-wrapper">
                        <input type="text" placeholder="Search by name"></input>
                    <button type="submit">go</button>
                    </div>
                 </div>
            </div>
        )
    }
}

export default Search;