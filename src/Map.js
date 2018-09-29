import React, { Component } from 'react';
import scriptLoader from 'react-async-script-loader';

class Map extends Component {
    //super- access the constructor method of the parent class. Props is included to access this.props inside of constructor.//
    constructor(props) {
        super(props);
        this.map = null; 
        this.marker; 
    }
    //*A decorator for script lazy loading on react component.*//
    componentWillReceiveProps({isScriptLoaded, isScriptLoadSucceed}) {
        if(isScriptLoaded && !this.props.isScriptLoaded) {
            if(isScriptLoadSucceed) {
                this.map = new window.google.maps.Map(this.refs.map, {
                    center: {lat: 35.2247583, lng: -80.8531362},
                    zoom: 11,
                });
                this.addMarkers();
            }else{
                alert('Script is not loaded')
            }
        }
    }
    //*Markers added to the map*//
    addMarkers() {
        if(this.props.markers){
            this.props.markers.map(marker => {
                    var myPlaces=marker.position
                    this.marker=new window.google.maps.Marker({
                        position: new window.google.maps.LatLng(marker.position),
                        map: this.map
                    });
            });   
        }
    }

    // removeMarkers() {
    //     if(this.props.markers){
    //         this.props.markers.map(marker => marker.remove());
    //     }
    //     this.marker=[];
    //  }

    // removeMarkers(){
    //     addMarkers(null);
    // }

    render() {
        return(
            //*Aria application role for users with low vision*//
            <div  ref="map"  style={{height:"calc(100% - 55px)", width:"100%"}} role="application" aria-hidden="true"></div> 
        )
    }
}
export default scriptLoader(
    ["https://maps.googleapis.com/maps/api/js?key=AIzaSyAMNNLlx0CHVAJYgJ50_WoS4AQ4WpUm0y4"]
)(Map)