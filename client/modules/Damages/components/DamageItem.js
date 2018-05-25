/**
 * Project       - ShaCar
 * Team          - Group 3 Carshare
 * Last Modified - 2018/05/25
 * Authors
 *               - Inga Pflaumer
 */
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

  renderImage(dm) {
    if(dm.imageUrl && dm.imageUrl.length>0) {
      return (<img src={dm.imageUrl} />);
    }
  }

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
				{this.renderImage(dm)}
				<p>{dm.description}</p>
        {this.props.button}
            </CardText>
          </CardBody>
        </Col>
        </Row>
    )
  }
}

export default DamageItem;

