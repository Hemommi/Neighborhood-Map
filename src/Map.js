import React, { Component } from 'react';
import scriptLoader from 'react-async-script-loader';

class Map extends Component {
    //super- access the constructor method of the parent class. Props is included to access this.props inside of constructor.//
    constructor(props) {
        super(props);
        this.map = null; 
        this.marker; 
    }
    //A decorator for script lazy loading on react component.//
    componentWillReceiveProps({isScriptLoaded, isScriptLoadSucceed}) {
        if(isScriptLoaded && !this.props.isScriptLoaded) {
            if(isScriptLoadSucceed) {
                this.map = new window.google.maps.Map(this.refs.map, {
                    center: {lat: 35.2247583, lng: -80.8531362},
                    zoom: 15,
                });
                this.markers();
            }else{
                alert('Script is not loaded')
            }
        }
    }
    markers() {
       let test =this.props.markers;
            var position = {lat: 35.1017389, lng: -80.9502442};
            this.marker= new window.google.maps.Marker({
                position: position,
                map: this.map
            });
        
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