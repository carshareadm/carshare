import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';

export class GMap extends Component {
  componentDidUpdate(prevProps, prevState) {
    if (this.map) {
      if (prevProps.lat !== this.props.lat || prevProps.lng !== this.props.lng) {
        const center = new this.props.google.maps.LatLng(this.props.lat, this.props.lng)
        this.map.panTo(center);
      }
      if(prevProps.zoom != this.props.zoom){
        this.map.setZoom(this.props.zoom);
      }
    }
  }

  componentDidMount(){
    this.loadMap();
  }

  renderChildren() {
    const {children} = this.props;

    if (!children || !this.map) return;
    console.log("renderChildren ", children);
    return React.Children.map(children, c => {
      //Add data to each marker
      return React.cloneElement(c, {
        map: this.map,
        google: this.props.google,
        mapCenter: this.props.coords
      });
    })
  }

  loadMap() {
    console.log("This props ",this.props);
    const maps = this.props.google.maps;
    const mapRef = this.refs.map;
    const node = ReactDOM.findDOMNode(mapRef);

    let zoom = this.props.zoom;
    let lat = this.props.lat;
    let lng = this.props.lng;
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
    return <div ref='map' style={{width: '100%', height: '100%'}}>{this.renderChildren()}</div>;
  }
}

export default GMap;