//Import react
import React, { Component, PropTypes } from 'react'; 
import { Link } from 'react-router';
import {
  Button,
  FormGroup,
  Label,
  Input,
  FormText,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Container,
  Row,
  Col,
} from "reactstrap";
import * as http from "../../util/http";

import DatePicker from 'react-datepicker';

import moment from 'moment';

import styles from './Booking.css'
import {Registration} from '../Registration/Registration';

const storage = require('../../util/persistedStorage');
//Booking component class
export class Booking extends Component {

	constructor(props){
		super(props);
		this.state = {
			startDate: moment(),
			startTime: moment(),
			endDate: moment(),
			endTime: moment(),
			loggedIn:false,
			
			touched: {
				startDate: false,
				startTime: false,
				endDate: false,
				endTime: false,
			}, 
		  };
//		  this.isFormInvalid = this.isFormInvalid.bind(this);
	
	}
//Set up variables for Msgs

labels = {
	startDate: 'Start Date and Time',
	endDate: 'End Date and Time',
  };

  errorMsgs = {
	startDate: 'a valid date in mm/dd/yyyy is required',
	endDate: 'a valid date in mm/dd/yyyy is required',
  };
  
	componentDidMount() {
		if(storage.get(storage.Keys.JWT))
		this.setState({	loggedIn:true });
	  }	

	handleBlur(field) {
		this.setState({ 
			touched: Object.assign({}, this.state.touched, { [field]: true }),
		});
	}
	
	handleStartDateChange = (evt) => {
		this.setState({ startDate: evt.target.value });
	}

	handleStartTimeChange = (evt) => {
		this.setState({ startTime: evt.target.value });
	}

	handleEndDateChange = (evt) => {
		this.setState({ endDate: evt.target.value });
	}

	handleEndTimeChange = (evt) => {
		this.setState({ endTime: evt.target.value });
	}

	handleSubmit(evt){
//       if (this.isFormInvalid()) {
//         evt.preventDefault();
//         return;
//       }
//       else{
         evt.preventDefault();
         http.client().post('/booking/', {
           email: this.state.email,
         })
         .then(res => {
           console.log(res);
           this.setState({booked: true});
         })
         .catch(err => console.log(err));
//       }
       //alert(`Signed up with email: ${email} password: ${password1} mobile: ${mobile} license: ${license}`);
	 }

	renderLabel(key, labelFor) {  
		/*
		if (this.isError(key)) {
	  		return <Label htmlFor={labelFor} className={'text-danger'}>{this.labels[key]}: {this.errorMsgs[key]}</Label>
		}
		*/
		return <Label htmlFor={labelFor}>{this.labels[key]}</Label>
	}

  	render() {
		return this.state.booked ? this.booked() : this.state.loggedIn ? this.bookingFrm() : this.register()
	  }
	register()
	{
		return(
		<div className={styles.body}>
				<h1 className={styles.title}>Please Register</h1>
				<p><Link to="/register">Click here to go to Register</Link><br /></p>
		</div>);
	}
	booked()
	{
		return(
		<div className={styles.body}>
				<h1 className={styles.title}>Booking success</h1>
				<p><Link to="/">Click here to return home</Link><br /></p>
		</div>);
	}
	
	bookingFrm()
	{
//		this.errors = this.validate();
//    const isDisabled = this.isFormInvalid();
	    // Here goes our page 
	  return (
	  <div className={styles.body}>
		<Container>
		<Row>
			<Col>
	        <h1 className={styles.title}>Booking</h1>
			</Col>
		</Row>
            <form onSubmit={this.handleSubmit.bind(this)}>
        <Row>
			<Col xs="12" sm="6">
			<hr/>
                <h4 className={styles.h4}>Check availability for:</h4>
                <p>Vehicle - </p>
                <p>Hire Type - </p>
                <p>Registration - </p>
				<br/>
                <p>Address Placeholder</p>
			</Col>
			<Col xs="12" sm="6">
			<hr/>
			<h4 className={styles.h4}>Booking Form</h4>
				<FormGroup>
          {this.renderLabel("startDate", "startDate")}
						<DatePicker 
						selected={this.state.startDate} 
						onChange={this.handleStartDateChange.bind(this)}
						showTimeSelect 
						timeFormat="HH:mm" 
						timeIntervals={15} 
						dateFormat="LLL" 
						timeCaption="time"/>
				</FormGroup>
				<FormGroup>
					{this.renderLabel("endDate", "endDate")}
						<DatePicker 
						selected={this.state.endDate} 
						onChange={this.handleEndDateChange.bind(this)}
						showTimeSelect 
						timeFormat="HH:mm" 
						timeIntervals={15} 
						dateFormat="LLL" 
						timeCaption="time"/>
				</FormGroup>
				<Button outline color="success" className={styles.wideBtn}>
                  Check Availability
                </Button>
			</Col>
		</Row>
            </form>
		<Row>
			<Col>
			<form onSubmit={this.handleSubmit.bind(this)}>
				<Button 
//				disabled={isDisabled} 
				outline color="success" className={styles.wideBtn}>
				Book
            	</Button>
			</form>
			</Col>
		</Row>
		</Container>
	    </div>
	    );
  }
}

export default Booking;