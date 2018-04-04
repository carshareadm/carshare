import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';

export class GMap extends Component {

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.google !== this.props.google) {
      this.loadMap();
    }
  }

  componentDidMount() {
    this.loadMap();
  }

  loadMap() {
    if (this.props && this.props.google) {
      // google is available
      const {google} = this.props;
      const maps = google.maps;

      const mapRef = this.refs.map;
      console.log(mapRef);

      const node = ReactDOM.findDOMNode(mapRef);

      //Need to swipe this for user coordinates or set to something
      let zoom = 14;
      let lat = 37.774929;
      let lng = -122.419416;
      const center = new maps.LatLng(lat, lng);
      
      const mapConfig = Object.assign({}, {
        center: center,
        zoom: zoom,
        style: {
          width: '100%',
          height: '100%',
        },
        containerStyle:{
          width: '100%',
          height: '100%',
        },
        className: "something",
      })
      this.map = new maps.Map(node, mapConfig);
    }

  }

  render() {
    return (
      <div ref='map' style={{width: '100%', height: '100%'}}>
        Loading map...
      </div>
    );
  }
}

export default GMap;