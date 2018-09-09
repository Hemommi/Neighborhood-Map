import React from 'react';

class PlacesList extends React.Component {
    
    render(){
        return(
            <div className="search-results">
                <ul className="list-group">
                    {this.props.places.map((myPlaces) => ( 
                        <li className="list-group-item" id="places-list">
                            {myPlaces.title}
                        </li>
                    ))}
                </ul>
            </div>
        )
    }
}

export default PlacesList;