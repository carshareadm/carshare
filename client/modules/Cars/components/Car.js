// Imports
import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import carPlaceholder from '../carPlaceholder.png';


// reactstrapify
import {
  Col,
  Card,
  CardHeader,
  CardBody,
  Button,
  CardText,
} from 'reactstrap';

import stylesMain from '../../../main.css';
import styles from './Car.css'

// component class
class Car extends Component {

  render() {
    const car = this.props.data;
    return (
        <Col xs="12" sm="6">
          <CardHeader>
            <img className={styles.carImage} src={carPlaceholder} />
          </CardHeader>
          <CardBody className={styles.carDescr}>
            <p>Vehicle - <b>{car.make} {car.model}</b></p>
            <p>HireType - <b>{car.vehicleType.name}</b></p>
            <p>Registration - <b>{car.rego}</b></p>
          </CardBody>
            <Link to={"/booking?carid="+car._id}>
              <Button className={stylesMain.buttons} color="primary" size="lg">Book</Button>
            </Link>
        </Col>
    );
  }
}

export default Car;

