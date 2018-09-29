import React from 'react';
import escapeRegExp from 'escape-string-regexp';
import sortBy from 'sort-by';

class PlacesList extends React.Component {
    
    render(){
        return(
            <div className="search-results">
                <ul className="list-group" role="presentation">
                    {this.props.places.map((myPlaces) => ( 
                        <li className="list-group-item" id="places-list" key={myPlaces.title}>
                            {myPlaces.title}
                        </li>
                    ))}
                </ul>
            </div>
        )
    }
}

export default PlacesList;