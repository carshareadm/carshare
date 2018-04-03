//Import react
import React, { Component, PropTypes } from 'react'; 
import { Link } from 'react-router';

import * as http from "../../util/http";

import style from './Booking.css'

//Booking component class
export class Booking extends Component {

	constructor(props){
		super(props);
		this.state = {
			email: '',
			loggedIn:false,
		};
	}

	mapUserToModel(user) {
		if(user) {
		  this.setState({
			email: user.email ? user.email : '',
			loggedIn:true,
		  });      
		}
	  }

	componentDidMount() {
		http
		  .client()
		  .get("/profile/my")
		  .then(res => {
			this.mapUserToModel(res.data);
			//this.render();
		  })
		  .catch(err => {
			console.log(err);
		  });
	  }	

  	render() {
		return this.state.loggedIn ? this.bookingFrm() : this.register()
	  }
	register()
	{
		return(
		<div className={style.body}>
				<h1 className={style.title}>Please Register</h1>
				<p><Link to="/register">Click here to go to Register</Link><br /></p>
		</div>);
	}
	bookingFrm()
	{
	    // Here goes our page 
	    return (
	        <div className={style.body}>
	        <h1 className={style.title}>Booking</h1>
            <p className={style.subtitle}><strong>Booking Form</strong><br /></p>
            <form>
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