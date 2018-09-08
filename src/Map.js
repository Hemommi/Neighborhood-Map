import React, { Component } from 'react';
import scriptLoader from 'react-async-script-loader';

class Map extends Component {
    //super- access the constructor method of the parent class. Props is included to access this.props inside of constructor.//
    constructor(props) {
        super(props);
        this.map = null;  
    }
    //I used window.google because google now in global scope//
    componentWillReceiveProps({isScriptLoaded, isScriptLoadSucceed}) {
        if(isScriptLoaded && !this.props.isScriptLoaded) {
            if(isScriptLoadSucceed) {
            this.map = new window.google.maps.Map(this.refs.map, {
                center: {lat: 35.2030728, lng: -80.9799138},
                zoom: 15,
            });
        }else{
            alert('Script is not loaded')
        }
    }
}
    render() {
        return(
            <div>
                <div  ref="map"  style={{height:"500px", width:"500px"}}></div>
            </div>
        ) 
    }
}
export default scriptLoader(
    ["https://maps.googleapis.com/maps/api/js?key=AIzaSyAMNNLlx0CHVAJYgJ50_WoS4AQ4WpUm0y4"]
)(Map)