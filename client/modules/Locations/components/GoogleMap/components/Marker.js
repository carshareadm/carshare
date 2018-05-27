/**
 * Project       - ShaCar
 * Team          - Group 3 Carshare
 * Last Modified - 2018/05/25
 * Authors
 *               - Inga Pflaumer
 */
import React, { Component, PropTypes } from 'react';

export class Marker extends Component{

	componentDidUpdate(prevProps) {
	    if ((this.props.map !== prevProps.map) ||
	      (this.props.position !== prevProps.position)) {
	        this.renderMarker();
	    }
	 }


	renderMarker() {
      let {
        map, google, position, mapCenter,
      } = this.props;
      const pos = new google.maps.LatLng(position.latitude, position.longitude);
      const pref = {
        map: map,
        position: pos,
      };
      this.marker = new google.maps.Marker(pref);
  }

	render() {
		this.renderMarker();
		return null;
	}
}

Marker.propTypes = {
  position: React.PropTypes.object,
  map: React.PropTypes.object,
}

export default Marker;