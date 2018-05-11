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
class BookingItem extends Component{
  
  constructor(props){
    super(props);
    this.state = {itemIsVisible:false};

    //Bind the function to the class
    this.itemToggle = this.itemToggle.bind(this);
  }

  itemToggle(){
    this.setState({
      itemIsVisible: !this.state.itemIsVisible,
    });
  }

  render(){
    return (
      <div>
            <h5 onClick={this.itemToggle}  className={stylesMain.h5}>{this.props.header}</h5> 
            {this.state.itemIsVisible ? this.props.children : null}
          </div>
    )
  }
}


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
      return <div className={stylesMain.bookingsCurrentB}>Current Booking</div>
    } else if(booking=="future"){
      return <div className={stylesMain.bookingsFutureB}>Future Booking</div>
    } else {
      return <div className={stylesMain.bookingsPastB}>Past Booking</div>
    }
  }

  renderAddDamage(bs){
    let booking = this.checkTheDate(bs);
    if(booking=="current"){
      return(
        <Link to={"/damage?bookingId="+bs._id}>
          <Button type="button" outline color="success" className={stylesMain.buttonSquareOutline}>Add Damage</Button>
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
              <Button className={stylesMain.buttonRed} color="danger">Reported Damage</Button>
            </Link>
         </div>
      )
    } else return null;
  }

  renderCancel(bs){
    let booking = this.checkTheDate(bs);
    if(booking=="future"){
      return(
        <Button type="button" outline color="success" className={stylesMain.buttonSquareOutline} onClick={e => this.handleCancel(e, bs._id)}>Cancel</Button>
      );
    }
    else
    {
      return null;
    }
  }

  renderExtend(bs){
    let booking = this.checkTheDate(bs);
    if(booking=="future" || booking=="current"){
      return(
        <Link to={"/booking/"+bs._id}><Button outline color="success" className={stylesMain.buttonSquareOutline}>Extend</Button></Link>
      );
    }
    else
    {
      return null;
    }
  }



  handleCancel(evt, id) {
    evt.preventDefault();
    if (id) {
      http
        .client()
        .put("/booking/cancel", {
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
           <div className={stylesMain.body}>

              {this.renderHeader(bs)}
              <div className={stylesMain.bookingItem}>
              {this.renderDamages(bs)}
              
              <CardText>        
                Booking Start: <span className={stylesMain.h4}>{moment(bs.startsAt).format('MMMM Do YYYY, h:mm a')} </span><br/>
                Booking End: <span className={stylesMain.h4}>{moment(bs.endsAt).format('MMMM Do YYYY, h:mm a')} </span><br/>
               <BookingItem header="Booking Details">  
                Model: <span className={stylesMain.h4}>{bs.car.make} {bs.car.model} </span><br/>
                Vehicle Type: <span className={stylesMain.h4}>{bs.car.vehicleType.name} </span><br/>
                Registration: <span className={stylesMain.h4}>{bs.car.rego}</span><br/>
                Vehicle Location: <span className={stylesMain.h4}>{bs.car.location.name} </span><br/>
                Hire Cost: <span className={stylesMain.h4}>$ {bs.totalCost} </span><br/>
                <br/>
                {this.renderCancel(bs)}&nbsp;
                {this.renderExtend(bs)}&nbsp;
                {this.renderAddDamage(bs)}
                </BookingItem>
              </CardText>
            </div>



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

