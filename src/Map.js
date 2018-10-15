import React, { Component } from 'react';
import scriptLoader from 'react-async-script-loader';
import axios from'axios';

class Map extends Component {
    constructor(props) {
        super(props);
        this.map = null; 
        this.markers = [];
        this.infoWindows = []; 
        this.venue_id = [];
        
        this.state = {
            venues: []
          };
    }

    //*Loading google map*///
    componentWillReceiveProps({isScriptLoaded, isScriptLoadSucceed}) {
        if(isScriptLoaded && !this.props.isScriptLoaded) {
            if(isScriptLoadSucceed) {
                this.map = new window.google.maps.Map(this.refs.map, {
                    center: {lat: 35.2247583, lng: -80.8531362},
                    zoom: 11,
                }); 
                this.loadVenues();
            }else{
                alert('Script is not loaded')
            }
        }
    }

    //*Downloading venues to all places*///
    loadVenues(venues){
       /*  this.props.places.map(place => {
            this.getVenue(place);
        }); */
        this.getVenue(this.props.places[0]);
    }
    //*Forsquer url with client_id, client_secret. *///
    getVenue(place) {
        const url ="https://api.foursquare.com/v2/venues/"+place.venue_id+"?&client_id=2RQ0EBUNQGMO32XYW5FECM1DPGIXMAXY1AXBSN2LHM1PZFB5&client_secret=04EIRAYHI2QHP4KJ3RWMSDBCSS3ERDF0ROS0BHYT4GT0WCC0&v=20181007";
        axios.get(url).then(response => {
            var venue = response.data.response.venue;

            this.setState({
                venues: [...this.state.venues, venue]
            })
            this.createMarker(place, venue);
        })
        .catch(error => {
            console.log("Error" + error);
        });
    }

    //*Creating google marker for given place*///
    createMarker(place, venue) {
        let marker = new window.google.maps.Marker({
            position: new window.google.maps.LatLng(place.position),
            map: this.map,
            title: place.title,
            address: place.address,
            animation: window.google.maps.Animation.DROP,
        });
        this.markers.push(marker);
        marker.addListener(marker, function(){
            this.setAnimation(window.google.maps.Animation.DROP);
        });
        this.addInfoWindow(marker, venue);
    }

    //*Add InfoWindow to each marker with title, address, phone number and photo*//
    addInfoWindow(marker, venue){
            var contentString = '<div id="infoWindow">'+
                                '<img class="info-photo" src=' + venue.bestPhoto.prefix + "500x500" +venue.bestPhoto.suffix +'><br/>' +
                                '<h6 class="info-title">' + venue.name + '</h6>' +
                                '<br/>' +
                                '<p class="info-address">' + venue.location.formattedAddress + '</p>'+
                                '<br/>' +
                                '<p class="info-phone">' + venue.contact.formattedPhone + '</p>' +'</div>'
            let infoWindow = new window.google.maps.InfoWindow({
                content: contentString,
            });
            //*Open an infoWindow*//
            marker.addListener('click', function(){
                infoWindow.setContent(contentString);
                infoWindow.open(this.map, marker);
            }); 
            //*Close infoWindow when click on map*//
            this.map.addListener('click', function(){
                infoWindow.close();
            });
     }

    render() {
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