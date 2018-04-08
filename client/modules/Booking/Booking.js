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

	intervalNum = 15;
	intervalUnit = "minutes";

	startTime = moment().add(2*this.intervalNum, this.intervalUnit);

	constructor(props){
		super(props);
		this.state = {
			car_id: '',
			startDate: this.startTime,
			endDate: this.startTime,
			selectedCar:false,
			loggedIn: false,
			booked: false,
			
			touched: {
				startDate: false,
				endDate: false,
			}, 
		  };
		  this.isFormInvalid = this.isFormInvalid.bind(this);
	
	}
//Set up variables for Msgs

labels = {
	startDate: 'Start Time',
	endDate: 'End Time',
  };

  errorMsgs = {
	startDate: 'a valid date and time at least '+2*this.intervalNum+' '+this.intervalUnit+' in the future is required',
	endDate: 'a date and time after start time is required',
  };
  
	componentDidMount() {
		if(storage.get(storage.Keys.JWT))
		this.setState({	loggedIn:true });
		console.log(Buffer.from(storage.get(storage.Keys.JWT)));
	  }	

	handleBlur(field) {
		this.setState({ 
			touched: Object.assign({}, this.state.touched, { [field]: true }),
		});
	}

	validate() {
		// true means invalid, so our conditions got reversed
		const errs = {
		  startDate: this.startTime.isAfter(this.state.startDate),
		  endDate: (this.state.startDate===this.state.endDate||this.state.startDate.isAfter(this.state.endDate)),
		};
		return errs;
	  }

	isFormInvalid() {
		return Object.keys(this.errors).some(x => this.errors[x] === true);
	}
	
	handleStartDateChange(date) {
		this.setState({ startDate: date });
	}

	handleEndDateChange(date) {
		this.setState({ endDate: date });
	}

	handleSubmit(evt){
       if (this.isFormInvalid()) {
         evt.preventDefault();
         return;
       }
       else{
         evt.preventDefault();
         http.client().post('/booking/', {
           car: this.state.car_id,
         })
         .then(res => {
           console.log(res);
           this.setState({booked: true});
         })
         .catch(err => console.log(err));
       }
       //alert(`Signed up with email: ${email} password: ${password1} mobile: ${mobile} license: ${license}`);
	 }

	isError(key) {
		const errorExists = this.errors[key];
		const touched = this.state.touched[key] === true;
		return errorExists && touched;
	}

	renderLabel(key, labelFor) {  
		
		if (this.isError(key)) {
	  		return <Label htmlFor={labelFor} className={'text-danger'}>{this.labels[key]}: {this.errorMsgs[key]}</Label>
		}
		
		return <Label htmlFor={labelFor}>{this.labels[key]}</Label>
	}

  	render() {
		return this.state.booked ? this.booked() : (this.state.loggedIn ? this.bookingFrm() : this.register());
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
		this.errors = this.validate();
	    const isDisabled = this.isFormInvalid();
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
						className={this.isError('startDate') ? 'is-invalid' : ''}
						selected={this.state.startDate} 
						onChange={this.handleStartDateChange.bind(this)}
						showTimeSelect 
						minDate={this.startTime}
						timeFormat="HH:mm" 
						timeIntervals={this.intervalNum} 
						dateFormat="LLL" 
						onBlur={() => this.handleBlur('startDate')}
						timeCaption="time"/>
				</FormGroup>
				<FormGroup>
					{this.renderLabel("endDate", "endDate")}
						<DatePicker 
						className={this.isError('endDate') ? 'is-invalid' : ''}
						selected={this.state.endDate} 
						onChange={this.handleEndDateChange.bind(this)}
						showTimeSelect 
						minDate={this.startTime}
						timeFormat="HH:mm" 
						timeIntervals={this.intervalNum} 
						dateFormat="LLL" 
						onBlur={() => this.handleBlur('endDate')}
						timeCaption="time"/>
				</FormGroup>
				<Button outline color="success" className={styles.wideBtn}
				disabled={isDisabled}>
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