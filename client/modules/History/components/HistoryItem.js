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
              Booking Start: {bs.startsAt.toDate()}
            </Col>
            <Col sm="12" lg="6">
              Booking End: {bs.endsAt.toDate()}
            </Col>
            <Col sm="12" lg="6">
              Registration: {bs.car.make} {bs.car.model}
            </Col>
            <Col sm="12" lg="6">
              Vehicle Type: {bs.car.vehicleType}
            </Col>
            <Col sm="12" lg="6">
              Vehicle Location: {bs.car.location.name}
            </Col>
            <Col sm="12" lg="6">
              Hire Cost: WIP
            </Col>
          </CardBody>
        </Col>
    )
  }
}

export default HistoryItem;

