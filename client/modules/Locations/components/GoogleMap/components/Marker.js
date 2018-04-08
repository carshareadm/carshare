import React, { Component, PropTypes } from 'react';

export class Marker extends Component{

	componentDidUpdate(prevProps) {
		console.log("componentDidUpdate");
	    if ((this.props.map !== prevProps.map) ||
	      (this.props.position !== prevProps.position)) {
	      	console.log("Trying to render marker");
	        this.renderMarker();
	    }
	 }


	renderMarker() {
      let {
        map, google, position, mapCenter
      } = this.props;
      console.log("Props ", this.props);
      const pos = new google.maps.LatLng(position.latitude, position.longitude);
      console.log("Lat ", pos.lat());
      const pref = {
        map: map,
        position: pos
      };
      console.log(pref);
      this.marker = new google.maps.Marker(pref);
  }

	render() {
		this.renderMarker();
		return null;
	}
}

Marker.propTypes = {
  position: React.PropTypes.object,
  map: React.PropTypes.object
}

export default Marker;