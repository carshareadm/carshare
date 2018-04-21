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
import styles from './HistoryItem.css'

// component class
class HistoryItem extends Component {

  checkTheDate(bs){
    if (moment().isBetween(moment(bs.startsAt), moment(bs.endsAt))){
      return "current"
    } else if (moment(bs.startsAt).isAfter(moment().add(1, 'd'))){
      return "future"
    } else {
      return "past"
    }
  }

  renderHeader(bs){
    let booking = this.checkTheDate(bs);
    if(booking=="current"){
      return <div className={styles.currentB}>Current Booking</div>
    } else if(booking=="future"){
      return <div className={styles.futureB}>Future Booking</div>
    } else {
      return <div className={styles.pastB}>Past Booking</div>
    }
  }

  render() {
    const bs = this.props.data;
    return (
        <div>
          <CardHeader>
            { this.renderHeader(bs) }
          </CardHeader>
          <CardBody>
            <Col>
              Booking Start: {moment(bs.startsAt).format('MMMM Do YYYY, h:mm a')}
            </Col>
            <Col>
              Booking End: {moment(bs.endsAt).format('MMMM Do YYYY, h:mm a')}
            </Col>
            <Col>
              Registration: {bs.car.make} {bs.car.model}
            </Col>
            <Col>
              Vehicle Type: {bs.car.vehicleType.name}
            </Col>
            <Col>
              Vehicle Location: {bs.car.location.name}
            </Col>
            <Col>
              Hire Cost: WIP
            </Col>
            <Link to={"/damage?bookingId="+bs._id}>
              <Button className={stylesMain.buttons} color="primary" size="lg">Add Damage</Button>
            </Link>
          </CardBody>
        </div>
    )
  }
}

export default HistoryItem;

