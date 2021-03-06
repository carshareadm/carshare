/**
 * Project       - ShaCar
 * Team          - Group 3 Carshare
 * Last Modified - 2018/05/25
 * Authors
 *               - Paul Crow
 *               - Inga Pflaumer
 */
import React, { Component, PropTypes } from "react";
import {
  Button,
  Row,
  Col,
  ButtonGroup,
  FormGroup,
  Input,
  Label,
  Form,
} from "reactstrap";
import {Typeahead} from 'react-bootstrap-typeahead';
import LocationAdm from './components/LocationAdm';

import manageSvc from "../../../services/manage.service";
import stylesMain from '../../../main.css';

export class LocationsAdm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      locations: [],
      selectedLocation: null,
      isCreating: false,
    };
  }

  componentDidMount() {
    this.getLocations();
  }

  getLocations() {
    manageSvc.locations.getAll()
      .then(res => this.setState({locations: res.data}))
      .catch(e => console.log(e));
  }

  handleLocationSelected(evt) {
    // evt is an array of objects
    this.setState({selectedLocation: evt[0]});
  }

  async handleSaved(saveLocation) {
    if (this.state.isCreating) {
      await this.isCreating(false);
      this.addSavedLocation(saveLocation);
    }
    this.getLocations();
  }

  addSavedLocation(location) {
    const locs = [...this.state.locations];
    locs.push(location);
    this.setState({
      ...this.state,
      locations: locs,
    })
  }

  selectedLocationForm() {
    return (
      !this.state.selectedLocation 
      ? '' 
      : <LocationAdm
          onSaved={this.handleSaved.bind(this)}
          location={this.state.selectedLocation}
          isCreating={this.state.isCreating} />
    );
  }

  clearSearch() {
    this.refs.typeahead.getInstance().clear();
    this.setState({selectedLocation: null});
  }

  async isCreating(isCreating) {
    const newLoc = {
      name: '',
      coordinates: {
        latitude: '-26.12954906860235',
        longitude: '134.12109375',
      },
      isDisabled: false,
    };

    if (isCreating && this.state.selectedLocation) {
      await this.setState({
        ...this.state,
        selectedLocation: null,
      });
    }

    this.setState({
      ...this.state,
      isCreating: isCreating,
      selectedLocation: isCreating ? newLoc : null,
    });
  }

  addOrCancelBtn() {
    return this.state.isCreating
    ? <Button
        className={stylesMain.addNewBtn}
        size="sm"
        color="link"
        onClick={(e) => this.isCreating(false)}>&times; Cancel</Button>
    : <Button
        className={stylesMain.addNewBtn}
        size="sm"
        color="link"
        onClick={(e) => this.isCreating(true)}>&#43; Add New</Button>
  }

  typeahead() {
    return this.state.isCreating
    ? ''
    : (
      <div className="input-group">
        <div className={stylesMain.flex1}>
          <Typeahead
            ref="typeahead"
            placeholder="Search for location..."
            onChange={(e) => this.handleLocationSelected(e)}
            labelKey={option => `${option.name}`}
            options={this.state.locations}
            filterBy={['name']}
          />
        </div>     
        <div className="input-group-append">
          <Button className="btn btn-outline-secondary" type="button" onClick={(e) => this.clearSearch()}>Clear</Button>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div className={stylesMain.body}>
        <Row>
          <Col lg="12">
            <h1 className={stylesMain.title}>Manage Locations</h1>
          </Col>
          <Col lg="12">
            <p>You can add a new location or edit existing locations by selecting them from the list.</p>
          </Col>
          <Col lg="12">
            {this.addOrCancelBtn()}
            {this.typeahead()}
            <hr className={stylesMain.clearBoth} />
          </Col>
        </Row>
        {this.selectedLocationForm()}
      </div>
    );
  }
}

export default LocationsAdm;