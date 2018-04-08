import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import {geolocated} from 'react-geolocated';

export class GMap extends Component {
  componentDidUpdate(prevProps, prevState) {
    if (this.props.coords && prevProps.coords !== this.props.coords) {
      this.loadMap();
      this.forceUpdate();
    }
  }

  renderChildren() {
    const {children} = this.props;

    if (!children || !this.map) return;
    console.log("renderChildren ", children);
    return React.Children.map(children, c => {
      return React.cloneElement(c, {
        map: this.map,
        google: this.props.google,
        mapCenter: this.props.coords
      });
    })
  }

  loadMap() {
    const maps = this.props.google.maps;
    const {coords} = this.props;

    const mapRef = this.refs.map;

    const node = ReactDOM.findDOMNode(mapRef);

    let zoom = 14;
    let lat = this.props.coords.latitude;
    let lng = this.props.coords.longitude;
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

  render() {
    if (!this.props.isGeolocationAvailable) {
      return <div>Your browser does not support Geolocation</div>;
    }

    if (!this.props.isGeolocationEnabled) {
      return <div>Waiting for geo location...</div>
    }

    if (!this.props.coords) {
      return <div>Waiting for geo coordinates...</div>
    }

    return <div ref='map' style={{width: '100%', height: '100%'}}>
         {this.renderChildren()}
    </div>;
  }
}

export default geolocated({
  positionOptions: {
    enableHighAccuracy: false,
  },
  userDecisionTimeout: 5000,
})(GMap);