/**
 * Project       - ShaCar
 * Team          - Group 3 Carshare
 * Last Modified - 2018/05/25
 * Authors
 *               - Paul Crow
 */
import React, { Component, PropTypes } from "react";
import {Map, Marker, GoogleApiWrapper} from 'google-maps-react';

export class MapContainer extends Component {

  constructor(props) {
    super(props);

    this.onMapClicked = this.onMapClicked.bind(this);
  }

  onMapClicked(p, m, e) {
    if (this.props.onMapClicked) {
      this.props.onMapClicked(e.latLng);
    }
  }

  render() {
    const style = {
      width: '100%',
      height: '100%',
    };

    this.marker = <Marker name={'Current location'} position={this.props.center} />;
    return (
      <Map 
          google={this.props.google}
          style={style}
          initialCenter={this.props.center}
          center={this.props.center}
          zoom={this.props.zoom}
          onClick={this.onMapClicked}
          >

        {this.marker}
      </Map>
    );
  }
}


export default GoogleApiWrapper({
  apiKey: "AIzaSyDNDbgxKeOa4-5-vKmCALzkNlVckM9rJ34",
})(MapContainer)