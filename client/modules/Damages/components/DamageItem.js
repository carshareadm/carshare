// Imports
import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import moment from 'moment';

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

// component class
class DamageItem extends Component {


  render() {
    const dm = this.props.data;
    return (
    	<Row>
        <Col>
          <CardHeader>
            Damage reported {moment(dm.loggedAt).format('LLL')}
          </CardHeader>
          <CardBody>
            <CardText>
				<p>Placehplder for the image</p>
				<p>{dm.description}</p>
            </CardText>
          </CardBody>
        </Col>
        </Row>
    )
  }
}

export default DamageItem;

