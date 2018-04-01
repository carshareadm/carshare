// Locations.js
// Imports
import React, { Component, PropTypes } from 'react';
import styles from './Locations.css';

// import components
import GMap from './components/GMap/GMap';
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
          <GMap/>
          <Cars/>
        </div>
      </div>
    );
  }
}

export default Locations;
