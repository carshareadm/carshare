// Imports
import React, { Component, PropTypes } from 'react';
import {geolocated} from 'react-geolocated';
import * as http from '../../util/http';
import { Col } from 'reactstrap';

import styles from './Locations.css';

// import components
import GoogleMap from './components/GoogleMap/GoogleMap';
import Cars from './components/Cars/Cars';
import distanceKM from './distanceKM';
import SelectLocation from './components/SelectLocation/SelectLocation';

const CLOSEZOOM = 14;
const INITIALLOC = {
      lat: "-21.0891304",
      lng: "95.4115513",
      zoom: 3
}


//Create a component class
class Locations extends Component {
  constructor(props) {
    super(props);
    this.setLocation = this.setLocation.bind(this);
    this.setInitialCoordinates = this.setInitialCoordinates.bind(this);

    //Set initial coordinates to Australia, make sure we don't have a current location selected
    this.state = { 
      cars: [], 
      locations: [], 
      currentcoords: INITIALLOC, 
      currentLocation: null, 
      sortedCars: []
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if((this.props.coords && prevProps.coords != this.props.coords)&& !this.state.currentLocation){ 
      //set coordinates each update
      this.setCoordinates(this.props.coords.latitude, this.props.coords.longitude);
    }
  }

  componentDidMount() {
    http
      .client()
      .get('/cars')
      .then(res => {
        //Save locations and sort cars based on KM distance to current location
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

  //Sort cars based on location and save the distance to the cars to display in Car.js
  sortCarsOnLoc(cars, lat, lng){
    return cars.slice(0).map(c => {
      c.distanceKM = distanceKM(
        c.location.coordinates.latitude, c.location.coordinates.longitude, lat, lng 
      ); 
      return c;
    }).sort((c1, c2) => (c1.distanceKM - c2.distanceKM));
  }

  setLocation(event){
    const loc = this.state.locations.find(l => l._id===event.target.dataset.id);
    this.setCoordinates(loc.coordinates.latitude, loc.coordinates.longitude);
    this.setState({
      currentLocation: loc
    });
  }

  setCoordinates(latitude, longitude){
    this.setState({
      currentcoords: {
        lat: latitude,
        lng: longitude,
        zoom: CLOSEZOOM,
      },
      sortedCars: this.sortCarsOnLoc(this.state.cars,latitude, longitude)
    })
  }

  setInitialCoordinates(){
    this.setState({
      currentLocation: null
    });
    if(this.props.coords){
      this.setCoordinates(this.props.coords.latitude, this.props.coords.longitude);
    }
  }

  render() {
    // Here goes our page
    return (
      <div className="container">
        <div className="row">
          <Col>
            <h1 className={styles.title}>Locations</h1>
          </Col>
        </div>
        <div className="row">
          <Col xs="12" sm="6">
              <SelectLocation 
                currentLocation={this.state.currentLocation} 
                locations={this.state.locations}
                setLocation={this.setLocation}
              />
          </Col>
          <Col xs="12" sm="6">
              <button type="button" 
                className={styles.buttons + " btn btn-primary"} 
                onClick={this.setInitialCoordinates}
              >
                Use Current Location
              </button>
          </Col>
        </div>

        <div className={styles.mapContainer+" row no-gutters"}>
          <Col xs="12" sm="6">
            <Cars cars={this.state.sortedCars}/>
          </Col>
          <Col className={styles.mapDiv} xs="12" sm="6">
            <GoogleMap 
              locations={this.state.locations} 
              zoom={this.state.currentcoords.zoom} 
              lat={this.state.currentcoords.lat} 
              lng={this.state.currentcoords.lng}
            />
          </Col>
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
