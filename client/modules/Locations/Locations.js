// Locations.js
// Imports
import React, { Component, PropTypes } from 'react';
import styles from './Locations.css';

// import components
import GoogleMap from './components/GoogleMap/GoogleMap';
import Cars from './components/Cars/Cars';

//Create a component class
class Locations extends Component {
  constructor(props) {
    super(props);
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

            <GoogleMap />
          </div>
          <Cars/>
        </div>
      </div>
    );
  }
}

export default Locations;
