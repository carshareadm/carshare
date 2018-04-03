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

import style from './Booking.css'

const storage = require('../../util/persistedStorage');
//Booking component class
export class Booking extends Component {

	constructor(props){
		super(props);
		this.state = {
			email: '',
			loggedIn:false,
			booked:false,
		};
		this.handleSubmit = this.handleSubmit.bind(this);
        this.canBeSubmitted = this.canBeSubmitted.bind(this);
	}

	componentDidMount() {
		if(storage.get(storage.Keys.JWT))
		this.setState({	loggedIn:true });
	  }	

	handleSubmit(evt){
       if (!this.canBeSubmitted()) {
         evt.preventDefault();
         return;
       }
       else{
         evt.preventDefault();
         http.client().post('/booking/', {
           email: this.state.email,
           mobile: this.state.mobile,
           password: this.state.password1,
         })
         .then(res => {
           console.log(res);
           this.setState({booked: true});
         })
         .catch(err => console.log(err));
       }
       //alert(`Signed up with email: ${email} password: ${password1} mobile: ${mobile} license: ${license}`);
	 }
	 
	 canBeSubmitted() {
		/*
        const errors = validate(this.state.email, this.state.password1, this.state.password2, this.state.mobile, this.state.license);
		const isDisabled = Object.keys(errors).some(x => errors[x]);
		
		return !isDisabled;
		*/
		return true; 
		// temporary, to be updated when validation is added
     }

  	render() {
		return this.state.booked ? this.booked() : this.state.loggedIn ? this.bookingFrm() : this.register()
	  }
	register()
	{
		return(
		<div className={style.body}>
				<h1 className={style.title}>Please Register</h1>
				<p><Link to="/register">Click here to go to Register</Link><br /></p>
		</div>);
	}
	booked()
	{
		return(
		<div className={style.body}>
				<h1 className={style.title}>Booking success</h1>
				<p><Link to="/">Click here to return home</Link><br /></p>
		</div>);
	}
	bookingFrm()
	{
	    // Here goes our page 
	    return (
	        <div className={style.body}>
	        <h1 className={style.title}>Booking</h1>
            <p className={style.subtitle}><strong>Booking Form</strong><br /></p>
            <form onSubmit={this.handleSubmit}>
                <label className={style.labels} htmlFor="location">
                    <div className={style.labelText}>Location *</div>
                    <select name="location">
						<option value="location1">Location 1</option>
						<option value="location2">Location 2</option>
						<option value="location3">Location 3</option>
						<option value="location4">Location 4</option>
					</select>
                </label>
				<br/>
                <label className={style.labels} htmlFor="Car">
                    <div className={style.labelText}>Car *</div>
                    <select name="Car">
						<option value="car1">Car 1</option>
						<option value="car2">Car 2</option>
						<option value="car3">Car 3</option>
						<option value="car4">Car 4</option>
					</select>
                </label>
				<br/>
                <label className={style.labels} htmlFor="startDate">
                    <div className={style.labelText}>Start Date *</div>
                    <input type="date" name="startDate" id="startDate"/>
                </label>
				<p className={style.note}>Please provide date in mm/dd/yyyy</p>
				<br/>
				<label className={style.labels} htmlFor="startTime">
                    <div className={style.labelText}>Start Time *</div>
                    <input type="time" name="startTime" id="startTime"/>
                </label>
				<p className={style.note}>Please provide time in hh:mm AM/PM</p>
				<br/>
				<label className={style.labels} htmlFor="endDate">
                    <div className={style.labelText}>End Date *</div>
                    <input type="date" name="endDate" id="endDate"/>
                </label>
				<p className={style.note}>Please provide date in mm/dd/yyyy</p>
				<br/>
				<label className={style.labels} htmlFor="endTime">
                    <div className={style.labelText}>End Time *</div>
                    <input type="time" name="endTime" id="endTime"/>
                </label>
				<p className={style.note}>Please provide time in hh:mm AM/PM</p>
				<br/>
                <input type="submit" value="Submit" />
            </form>
	        </div>
	    );
  }
}

export default Booking;