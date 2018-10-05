import React, { Component } from 'react';
import scriptLoader from 'react-async-script-loader';

class Map extends Component {
    //super- access the constructor method of the parent class. Props is included to access this.props inside of constructor.//
    constructor(props) {
        super(props);
        this.map = null; 
        this.markers = [];
        this.infoWindows = []; 
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
        if(this.props.places){
            this.props.places.map(place => {
                    var myPlaces = place.position
                    let marker = new window.google.maps.Marker({
                        position: new window.google.maps.LatLng(place.position),
                        map: this.map,
                        title: place.title,
                        address: place.address,
                        animation: window.google.maps.Animation.DROP,
                    });
                    this.markers.push(marker);

                    //*Add animation to all markers*//
                    for(let j = 0; j < this.markers.length; j++){
                        marker.addListener(this.markers[j], function(){
                            this.setAnimation(window.google.maps.Animation.DROP);
                        });
                    }
                    this.addInfoWindow();
            });  
        }
    }

    //*Add InfoWindow to each marker*//
    addInfoWindow(){
        this.markers.forEach(marker =>{
            var contentString = '<h6>' + marker.title + '</h6>' +
                                '<br/>' +
                                '<p>' + marker.address + '</p>';
            let infoWindow = new window.google.maps.InfoWindow({
                content: contentString,
            });
                //*Open an infoWindow*//
                marker.addListener('click', function(){
                infoWindow.setContent(contentString);
                infoWindow.open(this.map, marker);
            });
                //*Close an infoWindow when click on map*//
                this.map.addListener('click', function(){
                infoWindow.close();
                });
                
        });
         
     }

    render() {
        //*.setVisible() method*//
        let places = this.props.places;
        let markers = this.markers;
        let matchedPlace;

        if(places){
            markers.map(marker => {
                matchedPlace = places.find(place => {
                    return place.title === marker.title;
                });
                if(matchedPlace === undefined){
                    marker.setVisible(false);
                }else{
                    marker.setVisible(true);
                }
            });
        }

        return(
            //*Aria application role for users with low vision*//
            <div  ref="map"  style={{height:"calc(100% - 55px)", width:"100%"}} role="application" aria-hidden="true" tabIndex='-1'></div> 
        )
    }
}
export default scriptLoader(
    ["https://maps.googleapis.com/maps/api/js?key=AIzaSyAMNNLlx0CHVAJYgJ50_WoS4AQ4WpUm0y4"]
)(Map)