import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Map from './Map';
import {myPlaces} from './MyPlaces'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Search from './Search'
import PlacesList from './PlacesList'
// import { faStroopwafel } from '@fortawesome/free-solid-svg-icons'

//library.add(faStroopwafel)

class App extends Component {

  state = {
    places: myPlaces
  } 

  placesChanged = (filtredPlaces) => {
    this.setState({
      places: filtredPlaces
    });
  }

  render() {
    return (
      <div className="wrapper">
        <nav id="sidebar">
        <div className="sidebar-title">
            <h3>Neighborhood Map</h3>
        </div>
        <Search places={myPlaces} placesChanged={this.placesChanged}/>
        <PlacesList places={this.state.places}/>
        </nav>
        <div id="content">
          <nav className="navbar">
              <div className="container-fluid">
                  <button type="button" id="toggleSidebar" className="btn btn-info">
                      <i className="fas fa-align-left"></i>
                      <span>Toggle Sidebar</span>
                  </button>
              </div>
          </nav>
          <Map places={this.state.places} />
        </div>
      </div>
    );
  }
}

export default App;
