// GMap.js
// Imports
import React, { Component, PropTypes } from 'react';
import styles from './GMap.css';
// dummy map image
import dummyMap from './dummyMap.png'

// Create a component class
class GMap extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    // Here goes our page
    return (
      <div className="col-sm">
        <form>
          <input type="text" className="form-control" id="geocodeSearch" placeholder="Search location"/>
          <button type="button" className={styles.buttons + " btn btn-primary btn-lg btn-block"}>
            Use Current Location
          </button>
        </form>

        <div id="gmap">
          <img className="img-fluid" src={dummyMap}/>
        </div>
      </div>
    );
  }
}

export default GMap;
