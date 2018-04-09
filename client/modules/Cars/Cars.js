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

import styles from './Cars.css'

const storage = require('../../util/persistedStorage');

//Booking component class
export class Cars extends Component {

	constructor(props){
		super(props);
		this.state = {
			Vehicles: [],
			Vehicle: '',
			Rego: '',
			HireType: '',
			Address: '',
			selectedCar:false,
			loggedIn: false,
			booked: false,
		  };
	
	}
  Cars = [];
	componentDidMount() {
		if(storage.get(storage.Keys.JWT))
		this.setState({	loggedIn:true });
		http
      .client()
      .get("/cars")
      .then(res => {

        this.mapCarsToModel(res.data);
      })
      .catch(err => {
        console.log(err);
      });
	}	

	mapCarsToModel(car) {
		// forEach due to current car controller 
			if(car)
				{
					car.forEach(carItem => {
						this.Cars.push(carItem)
					});
			}
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
	    // Here goes our page 
	  return (
	  <div className={styles.body}>
		<Container>
		<Row>
			<Col>
	        <h1 className={styles.title}>Cars</h1>
			</Col>
		</Row>
            <form onSubmit={this.handleSubmit.bind(this)}>
		<Row>
			{console.log(this.Cars)}
			{this.Cars.forEach(element =>{
					console.log('ele has '+element);
					<Col>
					<p>{element.year+' '+element.make+' '+element.model+' '+element.colour}</p>
					<p>{element.rego ? element.rego : ''}</p>
					<p>{element.vehicleType.name ? element.vehicleType.hourlyRate ? element.vehicleType.name+' - $'+element.vehicleType.hourlyRate+'\/hr' : '' : ''}</p>
					<p>{element.location.name ? element.location.name : ''}</p>
					</Col>
				})}
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

export default Cars;