import React, { Component, PropTypes } from 'react';
import {GoogleApiWrapper} from 'google-maps-react';
import styles from './GMap.css';


// Create a component class

export class GMap extends Component {
  render() {
    if (!this.props.loaded) {
      return <div>Loading...</div>
    }
    return (
        <div className={styles.mapOverall}>
          <Map google={this.props.google} />
        </div>
    )
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyDNDbgxKeOa4-5-vKmCALzkNlVckM9rJ34"
})(GMap)

