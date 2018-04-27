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

  handleSaved(saveLocation) {
    this.getLocations();
  }

  selectedLocationForm() {
    return (
      !this.state.selectedLocation 
      ? '' 
      : <LocationAdm
          onSaved={this.handleSaved.bind(this)}
          location={this.state.selectedLocation} />
    );
  }

  clearSearch() {
    this.refs.typeahead.getInstance().clear();
    this.setState({selectedLocation: null});
  }

  render() {
    return (
      <div className={stylesMain.body}>
        <Row>
          <Col>
            <h1 className={stylesMain.title}>Manage Locations</h1>
            <div className="input-group">
              <Typeahead
                ref="typeahead"
                align="left"
                placeholder="Search for location..."
                onChange={(e) => this.handleLocationSelected(e)}
                labelKey={option => `${option.name}`}
                options={this.state.locations}
                filterBy={['name']}
              />              
              <div className="input-group-append">
                <Button className="btn btn-outline-secondary" type="button" onClick={(e) => this.clearSearch()}>Clear</Button>
              </div>
            </div>
            <hr />
          </Col>

        </Row>
        {this.selectedLocationForm()}
      </div>
    );
  }
}

export default LocationsAdm;