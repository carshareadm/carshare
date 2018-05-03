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

import * as http from "../../../util/http";

// component class
class HistoryItem extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isVisible: true,
    };
  }

  checkTheDate(bs){
    console.log("checkTheDate");
    console.log(bs.startsAt);
    console.log(bs.endsAt);
    if (moment().isBetween(moment(bs.startsAt), moment(bs.endsAt))){
      return "current"
    } else if (moment(bs.startsAt).isAfter(moment())){
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

  renderAddDamage(bs){
    let booking = this.checkTheDate(bs);
    if(booking=="current"){
      return(
        <Link to={"/damage?bookingId="+bs._id}>
          <Button className={stylesMain.buttons} color="primary" size="lg">Add Damage</Button>
        </Link>
      )
    } else {
      return null;
    }
  }

  renderDamages(bs){
    if(bs.car.damages.length>0){
      return(
        <div className="float-right">
            <Link to={`/damages/${bs.car._id}`}>
              <Button className={stylesMain.buttons} color="danger" size="lg">!</Button>
            </Link>
         </div>
      )
    } else return null;
  }

  renderCancel(bs){
    let booking = this.checkTheDate(bs);
    if(booking=="future"){
      return(
      <Button onClick={e => this.handleCancel(e, bs._id)}>Cancel</Button>
      );
    }
    else
    {
      return null;
    }
  }

  handleCancel(evt, id) {
    evt.preventDefault();
    console.log(id+" user: "+this.props.usr);
    if (id) {
      http
        .client()
        .post("/booking/cancel", {
          bookingid: id,
          userid: this.props.usr,
        })
        .then(res => {
          //Clear existing alert with opposite message
          this.props.clearAlert('cancelError');
          this.props.sendAlert('cancelSuccess');
          this.setState({isVisible:false});
        })
        .catch(err => {
          console.log(err);
          //Clear existing alert with opposite message
          this.props.clearAlert('cancelSuccess');
          this.props.sendAlert('cancelError');
        });
    }
  }

  render() {
    const bs = this.props.data;

    return(
      
      this.state.isVisible ?  
        <div>
            <CardHeader>
              {this.renderHeader(bs)}
            </CardHeader>
            <CardBody>
              {this.renderDamages(bs)}
              <CardText>
                Booking Start: {moment(bs.startsAt).format('MMMM Do YYYY, h:mm a')} <br/>
                Booking End: {moment(bs.endsAt).format('MMMM Do YYYY, h:mm a')} <br/>
                Registration: {bs.car.make} {bs.car.model} <br/>
                Vehicle Type: {bs.car.vehicleType.name} <br/>
                Vehicle Location: {bs.car.location.name} <br/>
                Hire Cost: {bs.totalCost} <br/>
                {this.renderCancel(bs)}
                {this.renderAddDamage(bs)}
              </CardText>
            </CardBody>
          </div>
          : null
    )
  }
}


HistoryItem.propTypes = {
  data: PropTypes.object.isRequired,
  usr: PropTypes.string.isRequired,
  sendAlert: PropTypes.func.isRequired,
  clearAlert: PropTypes.func.isRequired,
};

export default HistoryItem;

