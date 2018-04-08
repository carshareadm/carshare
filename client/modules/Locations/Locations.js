// Imports
import React, { Component, PropTypes } from 'react';
import {geolocated} from 'react-geolocated';
import * as http from '../../util/http';

import styles from './Locations.css';

// import components
import GoogleMap from './components/GoogleMap/GoogleMap';
import Cars from './components/Cars/Cars';

const CLOSEZOOM = 14;
const INITIALLOC = {
      lat: "-21.0891304",
      lng: "95.4115513",
      zoom: 3
}

//Next 2 functions are from StackOverflow https://stackoverflow.com/questions/27928/calculate-distance-between-two-latitude-longitude-points-haversine-formula
function distanceKM(lat1,lon1,lat2,lon2) {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2-lat1);  // deg2rad below
  var dLon = deg2rad(lon2-lon1); 
  var a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2)
    ; 
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  var d = R * c; // Distance in km
  return d;
}

function deg2rad(deg) {
  return deg * (Math.PI/180)
}

//Create a component class
class Locations extends Component {
  constructor(props) {
    super(props);
    this.state = { cars: [], locations: [], currentcoords: INITIALLOC, sortedCars: []};
  }

  componentDidUpdate(prevProps, prevState) {
    if(this.props.coords && prevProps.coords != this.props.coords){
      this.setState({
        currentcoords: {
          lat: this.props.coords.latitude,
          lng: this.props.coords.longitude,
          zoom: CLOSEZOOM,
        },
        sortedCars: this.sortCarsOnLoc(this.state.cars, this.props.coords.latitude, this.props.coords.longitude)
      })
    }
  }

  componentDidMount() {
    http
      .client()
      .get('/cars')
      .then(res => {
        this.setState({ 
          cars: res.data,
          locations: res.data.map(car => car.location),
          sortedCars: this.sortCarsOnLoc(res.data, this.state.currentcoords.lat, this.state.currentcoords.lng)  
        })
      })
      .catch(err => {
        console.log(err);
      });
  }

  sortCarsOnLoc(cars, lat, lng){
    return cars.slice(0).map(c => {
      c.distanceKM = distanceKM(
        c.location.coordinates.latitude, c.location.coordinates.longitude, lat, lng 
      ); 
      return c;
    }).sort((c1, c2) => (c1.distanceKM - c2.distanceKM));
  }


  render() {
    // Here goes our page
    return (
      <div className="container">
        <div className="row">
          <div className="col">
            <h1 className={styles.title}>Locations</h1>
            <h2 className={styles.subtitle}>Find a vehicle</h2>
          </div>
        </div>
        <div className="row">
            <form>
              <input type="text" className={styles.input+" form-control"} id="geocodeSearch" placeholder="Search location"/>
              <button type="button" className={styles.buttons + " btn btn-primary btn-lg btn-block"}>
                Use Current Location
              </button>
            </form>
        </div>

        <div className={styles.mapContainer+" row"}>
          <div className={styles.mapDiv+" col-sm"}>
            <GoogleMap 
              locations={this.state.locations} 
              zoom={this.state.currentcoords.zoom} 
              lat={this.state.currentcoords.lat} 
              lng={this.state.currentcoords.lng}
            />
          </div>
          <Cars cars={this.state.sortedCars}/>
        </div>
      </div>
    );
  }
}

export default geolocated({
  positionOptions: {
    enableHighAccuracy: false,
  },
  userDecisionTimeout: 5000,
})(Locations);
