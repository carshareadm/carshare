//Import react
import React, { Component, PropTypes } from 'react'; 
import { Link } from 'react-router';

import style from './Booking.css'

//Faq component class
export class Booking extends Component {

  	render() {
	    // Here goes our page 
	    return (
	        <div className={style.body}>
	        <h1 className={style.title}>Booking</h1>
            <p className={style.subtitle}><strong>Booking Form</strong><br /></p>
            <form>
                <label className={style.labels} for="location">
                    <div className={style.labelText}>Location *</div>
                    <select name="location">
						<option value="location1">Location 1</option>
						<option value="location2">Location 2</option>
						<option value="location3">Location 3</option>
						<option value="location4">Location 4</option>
					</select>
                </label>
				<br/>
                <label className={style.labels} for="Car">
                    <div className={style.labelText}>Car *</div>
                    <select name="Car">
						<option value="car1">Car 1</option>
						<option value="car2">Car 2</option>
						<option value="car3">Car 3</option>
						<option value="car4">Car 4</option>
					</select>
                </label>
				<br/>
                <label className={style.labels} for="startDate">
                    <div className={style.labelText}>Start Date *</div>
                    <input type="date" name="startDate" id="startDate"/>
                </label>
				<p className={style.note}>Please provide date in mm/dd/yyyy</p>
				<br/>
				<label className={style.labels} for="startTime">
                    <div className={style.labelText}>Start Time *</div>
                    <input type="time" name="startTime" id="startTime"/>
                </label>
				<p className={style.note}>Please provide time in hh:mm AM/PM</p>
				<br/>
				<label className={style.labels} for="endDate">
                    <div className={style.labelText}>End Date *</div>
                    <input type="date" name="endDate" id="endDate"/>
                </label>
				<p className={style.note}>Please provide date in mm/dd/yyyy</p>
				<br/>
				<label className={style.labels} for="endTime">
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