import React, { Component } from 'react';
import scriptLoader from 'react-async-script-loader';

class Map extends Component {
    //super- access the constructor method of the parent class. Props is included to access this.props inside of constructor.//
    constructor(props) {
        super(props);
        this.map = null; 
        this.markers = []; 
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
                    var myPlaces=place.position
                    let marker=new window.google.maps.Marker({
                        position: new window.google.maps.LatLng(place.position),
                        map: this.map,
                        title: place.title,
                        // draggable: true,
                        // animation: google.maps.Animation.DROP,
                    });
                    this.markers.push(marker);
            });  
            //   google.maps.addListener(marker, 'click', toggleBounce());
        }
    }

    //  toggleBounce() {
    //       if (this.getAnimation() !== null) {
    //        this.setAnimation(null);
    //       } else {
    //         this.setAnimation(google.maps.Animation.BOUNCE);
    //       }
    //     }


    render() {

        //*.setVisible() method*//
        // let places = this.props.places;
        // let markers = this.markers;
        //   if(this.markers.length){
        //     markers.map(marker => {
        //         let marker = this.markers.find(marker => {
        //             return 
        //     }) 
        // })
        //      this.markers.setVisible(true);
        //  } else {
        //      this.markers.setVisible(false);
        //  }

        return(
            //*Aria application role for users with low vision*//
            <div  ref="map"  style={{height:"calc(100% - 55px)", width:"100%"}} role="application" aria-hidden="true"></div> 
        )
    }
}
export default scriptLoader(
    ["https://maps.googleapis.com/maps/api/js?key=AIzaSyAMNNLlx0CHVAJYgJ50_WoS4AQ4WpUm0y4"]
)(Map)