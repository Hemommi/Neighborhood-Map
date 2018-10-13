import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Map from './Map';
import {myPlaces} from './MyPlaces'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Search from './Search'
import PlacesList from './PlacesList'
import ToggleSidebar from './ToggleSidebar'
 //import { faStroopwafel } from '@fortawesome/free-solid-svg-icons'

//library.add(faStroopwafel)

class App extends Component {

  state = {
    places: myPlaces,
    showSidebar: true,
  } 

  sidebarVisibilityChange = (newState) => {
    this.setState({
      showSidebar: newState
    });
  };

  placesChanged = (filtredPlaces) => {
    this.setState({
      places: filtredPlaces
    });
  }

  render() {
    return (
      <div className="wrapper">
        <nav id="sidebar" className={this.state.showSidebar ? "active" : ""}>
        <div className="sidebar-title">
            <h3>Neighborhood Map</h3>
        </div>
        <Search places={myPlaces} placesChanged={this.placesChanged}/>
        <PlacesList places={this.state.places}/>
        </nav>
        <div id="content">
          <nav className="navbar">
            <ToggleSidebar sidebarVisibilityChange={this.sidebarVisibilityChange }/>
          </nav>
          <Map places={this.state.places} />
        </div>
      </div>
    );
  }
}

export default App;
