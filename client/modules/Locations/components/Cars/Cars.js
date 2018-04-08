// Imports
import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';


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

  render() {
    // Generate a list of vehicles taking them from props
    const cars = this.props.cars;
    const cards = cars.map(
      (car) =>
        <Card key={car._id}>
          <CardHeader tag="h5">
            <div className="float-right text-muted">{Math.round(car.distanceKM*100)/100} km away</div>
            {car.year} {car.make} {car.model} ({car.colour}) <br/>
            <span className="text-muted">{car.location.name}</span>
          </CardHeader>
          <CardBody>
            <div className="float-right">
              <Button className={styles.buttons} color="primary" size="lg">Book</Button>
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
      <div>
        {cards}
      </div>
    );
  }
}

export default Cars;
