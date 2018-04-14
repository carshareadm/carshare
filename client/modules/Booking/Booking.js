//Import react
import React, { Component, PropTypes } from 'react'; 
import { Link } from 'react-router';
import {
  Button,
  FormGroup,
  Label,
	Input,
  Card,
  CardHeader,
  CardBody,
  CardText,
  FormText,
  Container,
  Row,
  Col,
} from "reactstrap";
import * as http from "../../util/http";

import DatePicker from 'react-datepicker';

import moment from 'moment';

import styles from './Booking.css'

//Booking component class
export class Booking extends Component {

	intervalNum = 15;
	intervalUnit = "minutes";

	startTime = moment().add(2*this.intervalNum, this.intervalUnit);

	constructor(props){
		super(props);
		this.state = {
			carid: '',
			userid: '',
			selectedCar:[],
			selectedLocation:[],
			startDate: this.startTime,
			endDate: this.startTime,
			selectedCar:false,
			loggedIn: false,
			booked: false,

			validated: true,
			
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
		if(window.localStorage.getItem('JWT'))
		{
			this.setState({	loggedIn:true });
			this.state.userid=JSON.parse(atob(window.localStorage.getItem('JWT').split('.')[1]))['sub'];
		}
		this.setState({	carid:this.props.location.query.carid });
		http.client()
		.get("/cars")
      	.then(res => {
        	this.mapCarToModel(res.data);
      	})
      	.catch(err => {
        	console.log(err);
		});
	}	

	mapCarToModel(car) {
		// forEach due to current car controller 
		car.forEach(element => {
			if(element._id==this.props.location.query.carid)
			{
				this.setState({selectedCar: element,
					selectedLocation: element.location}); 
			}
		}); 
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

	handleBooking(evt){
		evt.preventDefault();
		if (this.isFormInvalid()) {
			return;
		}
		else{
			http.client().post('/booking/', {
				userid: this.state.userid,
				car: this.state.carid,
				startAt: this.state.startDate,
				endAt: this.state.endDate,
			})
			.then(res => {
				console.log(res);
				this.setState({booked: true});
			})
			.catch(err => console.log(err));
		}
}

	handleSubmit(evt){
			evt.preventDefault();
      if (this.isFormInvalid()) {
        return;
      }
      else{
      	http.client().post('/booking/check', {
					car: this.props.location.query.carid,
					startAt: this.state.startDate,
					endAt: this.state.endDate,
      })
      .then(res => {
				if(res.data===true)
				{
					this.setState({validated: false});
				}
      })
      .catch(err => console.log(err));
    }
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
			if(!this.props.location.query.carid)
				return this.goback();
			else
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
	goback()
	{
		return(
		<div className={styles.body}>
				<h1 className={styles.title}>No car was selected</h1>
				<p><Link to={window.history.back()}>Redirecting to previous page</Link><br /></p>
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
			<Card key={this.state.selectedCar._id}>
          <CardHeader tag="h5">
            {this.state.selectedCar.year} {this.state.selectedCar.make} {this.state.selectedCar.model} ({this.state.selectedCar.colour}) <br/>
            <span className="text-muted">{this.state.selectedLocation.name}</span>
          </CardHeader>
          <CardBody>
            <CardText>
              Vehicle type: {this.state.selectedCar.vehicleType.name}, {this.state.selectedCar.doors} doors<br/>
              Seats: {this.state.selectedCar.seats}<br/>
              Hourly rate: ${this.state.selectedCar.vehicleType.hourlyRate.toFixed(2)}<br/>
              Registration: {this.state.selectedCar.rego}
            </CardText>
          </CardBody>
        </Card>
			</Col>
			<Col xs="12" sm="6">
			<hr/>
			<h4 className={styles.h4}>Booking Form</h4>
				<FormGroup>
          {this.renderLabel("startDate", "startDate")}
						<DatePicker 
						className={'form-control ' +this.isError('startDate') ? 'is-invalid' : ''}
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
						className={'form-control ' +this.isError('endDate') ? 'is-invalid' : ''}
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
			<form onSubmit={this.handleBooking.bind(this)}>
				<Button 
				disabled={this.state.validated ? true : false} 
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