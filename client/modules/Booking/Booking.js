//Import react
import React, { Component, PropTypes } from 'react'; 
import { Link } from 'react-router';

import style from './Booking.css'

//Faq component class
export class About extends Component {

  	render() {
	    // Here goes our page 
	    return (
	        <div className={style.body}>
	        	<h1 className={style.title}>About</h1>
	        	<p>
				Placeholder

				</p>
	        </div>
	    );
  }
}

export default About;