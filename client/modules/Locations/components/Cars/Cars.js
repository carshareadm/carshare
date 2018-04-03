// Cars.js
// Imports
import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import * as http from '../../../../util/http';

// reactstrapify
import {
  Col,
  Card,
  CardHeader,
  CardBody,
  Button,
  CardText,
} from 'reactstrap';

import styles from './Cars.css';

// component class
class Cars extends Component {
  constructor(props) {
    super(props);
    // default empty list
    this.state = { cars: [] };
  }

  componentDidMount() {
    http
      .client()
      .get('/cars')
      .then(res => {
        this.setState({ cars: res.data })
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    // Generate a list of vehicles
    const cars = this.state.cars;
    const cards = cars.map(
      (car) =>
        <Card key={car._id}>
          <CardHeader tag="h5">
            {car.year} {car.make} {car.model} ({car.colour}) <br/>
            <span className="text-muted">{car.location.name}</span>
          </CardHeader>
          <CardBody>
            <div className="float-right">
              <Button color="primary" size="lg">Book</Button>
            </div>
            <CardText>
              Vehicle type: {car.vehicleType.name}, {car.doors} doors<br/>
              Seats: {car.seats}<br/>
              Hourly rate: ${car.vehicleType.hourlyRate.toFixed(2)}<br/>
              Registration: {car.rego}
            </CardText>
          </CardBody>
        </Card>
    );

    return (
      <Col sm>
        {cards}
      </Col>
    );
  }
}

export default Cars;
