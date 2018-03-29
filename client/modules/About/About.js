//Import react
import React, { Component, PropTypes } from 'react'; 

import style from './About.css'

//Faq component class
export class About extends Component {

  	render() {
	    // Here goes our page 
	    return (
	        <div className={style.body}>
	        	<h1 className={style.title}>About</h1>
	        	<p>
				ShaCar is a Car Share company to help put people in cars.  Reducing the requirement for car ownership for people, reducing costs for our members, also going green where we can. <br/><br/>
				We love our cars and want to share with you.<br/><br/>
				At ShaCar,<br/>
					We own the cars, so you don't have to;<br/>
					We own the risks, so you don’t have to;<br/>
					We make driving as simple as ShaCar.<br/><br/>
				Register today to join us.<br/><br/>
				Click here to see our wide range of cars and locations.

				</p>
	        </div>
	    );
  }
}

export default About;