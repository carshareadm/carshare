// Imports
import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

// reactstrapify
import {
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  Button,
  CardText,
} from 'reactstrap';

import stylesMain from '../../../main.css';
import styles from './HistoryItem.css'

// component class
class HistoryItem extends Component {

  constructor(props){
    super(props);
  }

  render() {
    const bs = this.props.data;
    return (
        <Col>
          <CardHeader>
            Status Booking
          </CardHeader>
          <CardBody >
            <Col sm="12" lg="6">
              Booking Start: {bs.startsAt}
            </Col>
            <Col sm="12" lg="6">
              Booking End: {bs.endsAt}
            </Col>
            <Col sm="12" lg="6">
              Registration: {bs.car.make} {bs.car.model}
            </Col>
            <Col sm="12" lg="6">
              Vehicle Type: {bs.car.vehicleType.name}
            </Col>
            <Col sm="12" lg="6">
              Vehicle Location: {bs.car.location.name}
            </Col>
            <Col sm="12" lg="6">
              Hire Cost: WIP
            </Col>
            <Link to={"/damage?bookingId="+bs._id}>
              <Button className={stylesMain.buttons} color="primary" size="lg">Add Damage</Button>
            </Link>
          </CardBody>
        </Col>
    )
  }
}

export default HistoryItem;

