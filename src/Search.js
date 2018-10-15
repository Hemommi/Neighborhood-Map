import React from 'react';
import escapeRegExp from 'escape-string-regexp';

class Search extends React.Component {
    
    state = {
        query:''
    }
    
    updateQuery = (newquery) => {
        this.setState({ query: newquery });
        this.filterPlaces(newquery);
    }

    filterPlaces=(newquery) => {
        let newPlaces;
        if(newquery) {
            const match = new RegExp(escapeRegExp(newquery), 'i')
            newPlaces = this.props.places.filter((myPlaces) => match.test(myPlaces.title))
        }else{
            newPlaces = this.props.places;
        }
        this.props.placesChanged(newPlaces);
    }

    render(){  
        return(
            <div className="search">
                <div className="search-bar" role="search">
                    <div className="search-input-wrapper" role="search">
                        <input 
                            aria-label="search text"
                            type="text" 
                            placeholder="Search by name"
                            value={this.state.query}
                            onChange={(event) => this.updateQuery(event.target.value)}>
                        </input>
                    </div>
                 </div>
            </div>
        )
    }
}

export default Search;