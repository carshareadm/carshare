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
import styles from './HistoryItem.css'

// component class
class HistoryItem extends Component {

  constructor(props){
    super(props);
  }

  render() {
    return (
      <Row>
        <Col xs="12" sm="6">
          <CardHeader>
          </CardHeader>

          <CardBody >
          </CardBody>
        </Col>
      </Row>
    )
  }
}

export default HistoryItem;

