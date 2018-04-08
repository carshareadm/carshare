import React, { Component, PropTypes } from 'react';
import {GoogleApiWrapper} from 'google-maps-react';
import GMap from './components/GMap.js'
import Marker from './components/Marker.js'

import styles from './GoogleMap.css';


// Create a component class

export class GoogleMap extends Component {
  render() {
    if (!this.props.loaded || !this.props.google) {
      return <div>Loading...</div>
    }
    return (
        <GMap google={this.props.google}>
        	{this.props.locations.map(loc => <Marker position={loc.coordinates} key={loc._id} /> )}
        </GMap>
    )
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyDNDbgxKeOa4-5-vKmCALzkNlVckM9rJ34"
})(GoogleMap)

