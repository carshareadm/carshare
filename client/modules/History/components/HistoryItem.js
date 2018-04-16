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
              Booking End:
            </Col>
            <Col sm="12" lg="6">
              Registration
            </Col>
            <Col sm="12" lg="6">
              Vehicle Type
            </Col>
            <Col sm="12" lg="6">
              Vehicle Location
            </Col>
            <Col sm="12" lg="6">
              Hire Cost
            </Col>
          </CardBody>
        </Col>
    )
  }
}

export default HistoryItem;

