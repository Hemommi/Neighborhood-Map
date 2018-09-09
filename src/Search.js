import React from 'react';
import escapeRegExp from 'escape-string-regexp';
import sortBy from 'sort-by';

class Search extends React.Component {
    
    state = {
        query:''
    }
    
    updateQuery = (newquery) => {
        this.setState({ query: newquery });
        this.filterPlaces();
    }

    filterPlaces() {
        let newPlaces;
        if(this.state.query) {
            const match = new RegExp(escapeRegExp(this.state.query), 'i')
            newPlaces = this.props.places.filter((myPlaces) => match.test(myPlaces.title))
        }else{
            newPlaces = this.props.places;
        }
            this.props.placesChanged(newPlaces);
    }

    render(){  
        return(
            <div className="search">
                <div className="search-bar">
                    <div className="search-input-wrapper">
                        <input 
                            type="text" 
                            placeholder="Search by name"
                            value={this.state.query}
                            onChange={(event) => this.updateQuery(event.target.value)}></input>
                        <button type="submit">go</button>
                    </div>
                 </div>
            </div>
        )
    }
}

export default Search;