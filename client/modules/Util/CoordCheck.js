// Imports
import React, { Component, PropTypes } from 'react';
import {geolocated} from 'react-geolocated';
import * as http from '../../util/http';
import {
  Button,
  FormGroup,
  Label,
  Input,
  FormText,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Container,
  Row,
  Col,
  Alert,
} from "reactstrap";

import stylesMain from "../../main.css";

//Create a component class
class CoordCheck extends Component {
  constructor() {
    super();
    this.state = {
      lon: '0',
      lat: '0',
      carId: '0',
    };
  }

  setValue(name, value) {
    this.setState({ [name]: value });
  }

  checkCar(carId, lat, lon){
    http
      .client()
      .post("/movement/create", {       
        car: this.state.carId,
        latitude: this.state.lat,
        longitude: this.state.lon,
        timestamp: new Date() })
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  }
  render() {
    // Here goes our page
    return (
      <div className={stylesMain.body}>
        <Row>
          <Col>
            <h1>Test for locations</h1>
          </Col>
        </Row>
        <Row>
          <Col>
            <FormGroup>
              <Label className={stylesMain.label}>Car</Label>
              <Input type="text"
                    name="carId"
                    id="carId"
                    value={this.state.carId}
                    onChange={(e) => this.setValue('carId', e.target.value)}
                    placeholder="CarId"/>
              
              <Label className={stylesMain.label}>Lat</Label>
              <Input type="text"
                    name="lat"
                    id="lat"
                    value={this.state.lat}
                    onChange={(e) => this.setValue('lat', e.target.value)}
                    placeholder="Latitude"/>

              <Label className={stylesMain.label}>Long</Label>
              <Input type="lon"
                    name="lon"
                    id="lon"
                    value={this.state.lon}
                    onChange={(e) => this.setValue('lon', e.target.value)}
                    placeholder="Longitude"/>

              <Button
              className={stylesMain.wideBtn1}
                type="submit"
                outline
                color="success"
                onClick={() => this.checkCar()}
              >
                Submit
              </Button>
            </FormGroup>
          </Col>
        </Row>
      </div>
    );
  }
}

export default CoordCheck;
