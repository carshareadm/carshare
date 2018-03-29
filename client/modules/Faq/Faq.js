//Import react
import React, { Component, PropTypes } from 'react'; 

import style from './Faq.css'

//Additional component. May be moved to the separate component file later
class FaqItem extends Component{
	
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
	        	<h3 onClick={this.itemToggle}  className={style.questiontitle}>{this.props.question}</h3> 
	        	{this.state.itemIsVisible ? this.props.children : null}
	        </div>

		)
	}
}

//Faq component class
export class Faq extends Component {

  	render() {
	    // Here goes our page 
	    return (
	        <div className={style.body}>
	        	<h1 className={style.title}>FAQ</h1>
	        	<h2 className={style.subtitle}>Registration</h2>
		        <FaqItem question="How to use ShaCar?">
		        	<div>
						<ol>
							<li className={style.innerLi}>
							Go to registration page. From homepage, click/tap Register.
							</li>
							<li className={style.innerLi}>
							Fill your details into our registration form.
							<ul>
								<li className={style.innerLi}>E-mail address</li>
								<li className={style.innerLi}>Mobile phone number</li>
								<li className={style.innerLi}>Password</li>
							</ul>
							</li>
							<li className={style.innerLi}>
							A 4-digit verification code will be sent to your phone via SMS.</li>
							<li className={style.innerLi}>
							Enter verification code.<br/>
							Once the code is verified, you will be directed to your profile to provide some additional informaiton.
							<br />This includes your name, license information, and payment information.</li>
							<li className={style.innerLi}>
							Take or upload a photo of your licence.<br/>
							Make sure the details and your face are clearly visible.</li>
							<li className={style.innerLi}>Enter credit/debit card details.<br/>
							Note: a $250 pre-authorization will be charged to your card.</li>
							<li className={style.innerLi}>
							Once your profile is saved, you are ready to use ShaCar!</li>
						</ol>
		        	</div>
		        </FaqItem>
				<FaqItem question="What do I need?">
		        	<div>
						<p>The following are required in the registration process:</p>
						<ul>
							<li className={style.innerLi}>A valid driver's license.</li>
							<li className={style.innerLi}>A valid email you have access to.</li>
							<li className={style.innerLi}>A valid phone number you have access to.</li>
						</ul>
						<p>The following is optional, but it will improve your experience:</p>
						<ul>
							<li className={style.innerLi}>A printer to print access codes to use offline. </li>
							<li className={style.innerLi}>A smartphone with internet access and camera function. </li>
						</ul>
		        	</div>
		        </FaqItem>
				<br />
				<h2 className={style.subtitle}>Booking a car</h2>
	        	<FaqItem question="How to book a car?">
		        	<div>
						<p>To make a booking.</p>
						<ul>
							<li className={style.innerLi}>Go to the ShaCar web application at ShaCar.com</li>
							<li className={style.innerLi}>Tap/click Register / Login and login with your email and password.</li>
							<li className={style.innerLi}>At the Locations screen, allow the app to use your location.
							<br/>You will see a map of the area showing the vehicle locations near your current location.
							<br/>You can use the location search to look at other areas.
							<br/>Below the map is a list of the vehicles at the locations shown in the map. The vehicle type, pricing, and availability are shown.</li>
							<li className={style.innerLi}>Tap/click Book to choose the car you want to book.
							<br/>The details of the location and vehicle will be displayed. </li>
							<li className={style.innerLi}>Select the time and duration of your booking. </li>
							<li className={style.innerLi}>Check the charges for this booking. Tap/click Confirm to complete the booking. 
							<br/>Your booking and the QR code for unlocking the car will be displayed.</li>
						</ul>

		        	</div>
	        	</FaqItem>
				<FaqItem question="What is the cost?">
		        	<div>
						<p>We charge per hr depending on the vehcilce type.<br/>
						The cost per hr is listed below:</p>
						<br/>
						<ul>
							<li className={style.innerLi}>Small Vehicle : $ 7.00 per hour.
							
							<ul>
								<li className={style.innerLi}>Hyundai Getz</li>
								<li className={style.innerLi}>Holden Cruze</li>
							</ul>				
							</li>
							<li className={style.innerLi}>Sports Vehicle : $ 8.75 per 
							hour.
							
							<ul>
								<li className={style.innerLi}>Mazda MX-5</li>
								<li className={style.innerLi}>Ford Mustang</li>
							</ul>
							</li>
							<li className={style.innerLi}>Luxury Vehicle : $10.50 per hour.
							
							<ul>
								<li className={style.innerLi}>Audi A6</li>
								<li className={style.innerLi}>BMW Series 5</li>
							</ul>
							</li>
							<li className={style.innerLi}>Sport Utility Vehicle : $ 10.50 per hour.
							
							<ul>
								<li className={style.innerLi}>Kia Sorento</li>
								<li className={style.innerLi}>Mazda CX-9</li>
							</ul>
							</li>
						</ul>
		        	</div>
	        	</FaqItem>
				<br />
	        	<h2 className={style.subtitle}>Using a car</h2>
	        	<FaqItem question="How to start my booking?">
		        	<div>
						<p>
						To starting you booking.</p>
						<ol>
							<li className={style.innerLi}>Log in to ShaCar and navigate to your current booking. <br/>
							This will show the QR code for the booking. <br/>
							QR code will be saved in the app for access in event of loss of mobile coverage.</li>
							
							<li className={style.innerLi}>Scan the QR code through the windscreen to unlock the vehicle.<br/>
							Note: the QR code will only be valid 5 minutes before the start of your booking. <br/>
							The in-vehicle QR code scanner is located at the bottom corner on the driver’s side of the windscreen. </li>
							<li className={style.innerLi}>Inspect the vehicle for any damage outside and inside.<br/>
							Click/tap Log Damage to record any damage found.<br/>
							Follow the prompts to record images and description of the damage.</li>
							<li className={style.innerLi}>You are ready to go!<br/>
							The keys are in the vehicle on a retractable cord attached to the bottom of the dashboard.</li>
							</ol>
		        	</div>
	        	</FaqItem>
				<FaqItem question="How to access a car during booking?">
		        	<div>
						<p>
						To access the vehicle during your booking</p>
						<ul>
							<li className={style.innerLi}>To unlock the vehicle, scan the QR code again.</li>
							<li className={style.innerLi}>If you leave the vehicle during the booking, scan the QR code to lock it.</li>
						</ul>
						<p><strong>DO NOT REMOVE THE KEYS FROM THE VEHICLE.</strong>
						<br/>
						<br/>The QR code will remain valid for 24 hours after the booking ends.<br/>
						This is strictly for emergencies only.<br/>
						Non-emergency access outside of your booking will incur a fine.
						</p>
							
		        	</div>
	        	</FaqItem>
				<FaqItem question="What do I do when I am finished?">
		        	<div>
						<p>
						To end your booking</p>
						<ol>
							<li className={style.innerLi}>Return the ShaCar vehicle to its designated location.</li>
							<li className={style.innerLi}>Exit the vehicle and remove all personal belongings.</li>
							<li className={style.innerLi}>Lock the car by scanning the QR code.
							</li>
						</ol>
						<p><strong>DO NOT REMOVE THE KEYS FROM THE VEHICLE.</strong>
						<br/>
						<br/>The QR code will remain valid for 24 hours after the booking ends.<br/>
						This is strictly for emergencies only.<br/>
						Non-emergency access outside of your booking will incur a fine.
						</p>
							
		        	</div>
	        	</FaqItem>						
				<br />
	        </div>
	    );
  }
}

export default Faq;