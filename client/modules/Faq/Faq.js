//Import react
import React, { Component, PropTypes } from 'react'; 
import ReactDOMServer from 'react-dom/server';
import Fuse from 'fuse.js';

import styles from './Faq.css'
import stylesMain from '../../main.css';
import Search from './components/Search'


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
  Alert,
} from "reactstrap";

let items = [];

const findMatchingItems = (query) => {
	const texts = items.map(item => ({ question: item.question, text: item.text }));
	const questions = new Fuse(texts, {
		keys: ['text', 'question'],
		id: 'question',
		distance: 100000,
		includeScore: true,
		threshold: 0.01,
		includeMatches: true,
		shouldSort: true,
	}).search(query).reverse();

	return questions;
}

//Additional component. May be moved to the separate component file later
class FaqItem extends Component{
	render(){
		items.push({
			question: this.props.question,
			children: this.props.children,
			text: ReactDOMServer.renderToStaticMarkup(this.props.children).replace(/<(?:.|\n)*?>/gm, '')
		});

		return (
			<div className={styles.faqItem}>
	        	<h3 onClick={() => this.props.selectQuestion(this.props.question)} className={styles.questiontitle}>
	        		{this.props.question}
	        	</h3> 
	        	{this.props.activeQuestion == this.props.question ? this.props.children : null}
	        </div>
		)
	}
}

class FaqItems extends Component{
  	render() {
  		// clear the items list to store them again during render
  		items = [];

	    // Here goes our page 
	    return (
	        <Row>
		    	<Col xs="12" sm="6">
			      	<h3 className={styles.subtitle}>Registration</h3>
				        <FaqItem question="How to use ShaCar?" {...this.props}>
				        	<div>
								<ol>
									<li className={styles.innerLi}>
									Go to registration page. From homepage, click/tap Register.
									</li>
									<li className={styles.innerLi}>
									Fill your details into our registration form.
									<ul>
										<li className={styles.innerLi}>E-mail address</li>
										<li className={styles.innerLi}>Mobile phone number</li>
										<li className={styles.innerLi}>Password</li>
									</ul>
									</li>
									<li className={styles.innerLi}>
									A 4-digit verification code will be sent to your phone via SMS.</li>
									<li className={styles.innerLi}>
									Enter verification code.<br/>
									Once the code is verified, you will be directed to your profile to provide some additional informaiton.
									<br />This includes your name, license information, and payment information.</li>
									<li className={styles.innerLi}>
									Take or upload a photo of your licence.<br/>
									Make sure the details and your face are clearly visible.</li>
									<li className={styles.innerLi}>Enter credit/debit card details.<br/>
									Note: a $250 pre-authorization will be charged to your card.</li>
									<li className={styles.innerLi}>
									Once your profile is saved, you are ready to use ShaCar!</li>
								</ol>
				        	</div>
				        </FaqItem>
						<FaqItem question="What do I need?" {...this.props}>
				        	<div>
								<p className={styles.innerLiBold}>The following are required in the registration process:</p>
								<ul>
									<li className={styles.innerLi}>A valid driver's license.</li>
									<li className={styles.innerLi}>A valid email you have access to.</li>
									<li className={styles.innerLi}>A valid phone number you have access to.</li>
								</ul>
								<p className={styles.innerLiBold}>The following is optional, but it will improve your experience:</p>
								<ul>
									<li className={styles.innerLi}>A printer to print access codes to use offline. </li>
									<li className={styles.innerLi}>A smartphone with internet access and camera function. </li>
								</ul>
				        	</div>
				        </FaqItem>
				        <br />
						<h3 className={styles.subtitle}>Booking a car</h3>
			        	<FaqItem question="How to book a car?" {...this.props}>
				        	<div>
								<p className={styles.innerLiBold}>To make a booking.</p>
								<ul>
									<li className={styles.innerLi}>Go to the ShaCar web application at ShaCar.com</li>
									<li className={styles.innerLi}>Tap/click Register / Login and login with your email and password.</li>
									<li className={styles.innerLi}>At the Locations screen, allow the app to use your location.
									<br/>You will see a map of the area showing the vehicle locations near your current location.
									<br/>You can use the location search to look at other areas.
									<br/>Below the map is a list of the vehicles at the locations shown in the map. The vehicle type, pricing, and availability are shown.</li>
									<li className={styles.innerLi}>Tap/click Book to choose the car you want to book.
									<br/>The details of the location and vehicle will be displayed. </li>
									<li className={styles.innerLi}>Select the time and duration of your booking. </li>
									<li className={styles.innerLi}>Check the charges for this booking. Tap/click Confirm to complete the booking. 
									<br/>Your booking and the QR code for unlocking the car will be displayed.</li>
								</ul>

				        	</div>
			        	</FaqItem>
						<FaqItem question="What is the cost?" {...this.props}>
				        	<div>
								<p className={styles.innerLiBold}>We charge per hr depending on the vehcilce type.<br/>
								The cost per hr is listed below:</p>
								<br/>
								<ul>
									<li className={styles.innerLi}>Small Vehicle : $ 7.00 per hour.
									
									<ul>
										<li className={styles.innerLi}>Hyundai Getz</li>
										<li className={styles.innerLi}>Holden Cruze</li>
									</ul>				
									</li>
									<li className={styles.innerLi}>Sports Vehicle : $ 8.75 per 
									hour.
									
									<ul>
										<li className={styles.innerLi}>Mazda MX-5</li>
										<li className={styles.innerLi}>Ford Mustang</li>
									</ul>
									</li>
									<li className={styles.innerLi}>Luxury Vehicle : $10.50 per hour.
									
									<ul>
										<li className={styles.innerLi}>Audi A6</li>
										<li className={styles.innerLi}>BMW Series 5</li>
									</ul>
									</li>
									<li className={styles.innerLi}>Sport Utility Vehicle : $ 10.50 per hour.
									
									<ul>
										<li className={styles.innerLi}>Kia Sorento</li>
										<li className={styles.innerLi}>Mazda CX-9</li>
									</ul>
									</li>
								</ul>
				        	</div>
			        	</FaqItem>
						<br />
				</Col>	
				<Col xs="12" sm="6">
			        	<h3 className={styles.subtitle}>Using a car</h3>
			        	<FaqItem question="How to start my booking?" {...this.props}>
				        	<div>
								<p className={styles.innerLiBold}>To starting you booking.</p>
								<ol>
									<li className={styles.innerLi}>Log in to ShaCar and navigate to your current booking. <br/>
									This will show the QR code for the booking. <br/>
									QR code will be saved in the app for access in event of loss of mobile coverage.</li>
									
									<li className={styles.innerLi}>Scan the QR code through the windscreen to unlock the vehicle.<br/>
									Note: the QR code will only be valid 5 minutes before the start of your booking. <br/>
									The in-vehicle QR code scanner is located at the bottom corner on the driver’s side of the windscreen. </li>
									<li className={styles.innerLi}>Inspect the vehicle for any damage outside and inside.<br/>
									Click/tap Log Damage to record any damage found.<br/>
									Follow the prompts to record images and description of the damage.</li>
									<li className={styles.innerLi}>You are ready to go!<br/>
									The keys are in the vehicle on a retractable cord attached to the bottom of the dashboard.</li>
									</ol>
				        	</div>
			        	</FaqItem>
						<FaqItem question="How to access a car during booking?" {...this.props}>
				        	<div>
								<p className={styles.innerLiBold}>To access the vehicle during your booking</p>
								<ul>
									<li className={styles.innerLi}>To unlock the vehicle, scan the QR code again.</li>
									<li className={styles.innerLi}>If you leave the vehicle during the booking, scan the QR code to lock it.</li>
								</ul>
								<p className={styles.innerLiBold}><strong>DO NOT REMOVE THE KEYS FROM THE VEHICLE.</strong>
								<br/>
								<br/>The QR code will remain valid for 24 hours after the booking ends.<br/>
								This is strictly for emergencies only.<br/>
								Non-emergency access outside of your booking will incur a fine.
								</p>
									
				        	</div>
			        	</FaqItem>
						<FaqItem question="What do I do when I am finished?" {...this.props}>
				        	<div>
								<p className={styles.innerLiBold}>To end your booking</p>
								<ol>
									<li className={styles.innerLi}>Return the ShaCar vehicle to its designated location.</li>
									<li className={styles.innerLi}>Exit the vehicle and remove all personal belongings.</li>
									<li className={styles.innerLi}>Lock the car by scanning the QR code.
									</li>
								</ol>
								<p className={styles.innerLiBold}><strong>DO NOT REMOVE THE KEYS FROM THE VEHICLE.</strong>
								<br/>
								<br/>The QR code will remain valid for 24 hours after the booking ends.<br/>
								This is strictly for emergencies only.<br/>
								Non-emergency access outside of your booking will incur a fine.
								</p>
									
				        	</div>
			        	</FaqItem>						
						<br />
				</Col>
				</Row>
	    );
    }
}

class SearchResults extends Component {
	renderItem(item) {
		return (
			<div key={item.item}>
	        	<h3>{item.item}</h3> 
	        	<p>
	        		<a href="#" onClick={() => this.props.selectQuestion(item.item)}>
	        			click here to see the full answer
	        		</a>
	        	</p>
	        </div>
		);
	}
	render() {
		const items = findMatchingItems(this.props.query);

		// render matching items
		return (
			<div className={stylesMain.body}>
				<Container>
					{items.map(item => this.renderItem(item))}
				</Container>
			</div>
		);
	}
}

//Faq component class
export class Faq extends Component {

	constructor() {
		super();
		this.search = this.search.bind(this);
		this.selectQuestion = this.selectQuestion.bind(this);
		this.state = {
			query: "",
			activeQuestion: ""
		};
	}

	search(query) {
		this.setState({ query, activeQuestion: "" });
	}

	selectQuestion(activeQuestion) {
		this.setState({
			query: "",
			activeQuestion
		})
	}

  	render() {
  		return (
  			<div className={stylesMain.body}>
        	<Container>
          	<Row>
            	<Col xs="12" sm="6">
	        		<h1 className={styles.title}>FAQ</h1>
	        	</Col>
	        	<Col xs="12" sm="6">
	        		<Search query={this.state.query} onSearch={this.search}/>
	        	</Col>
	        </Row>
	        </Container>
	        {this.state.query.length > 2 ?
	        	<SearchResults query={this.state.query} selectQuestion={this.selectQuestion} /> :
	        	<FaqItems
	        		selectQuestion={this.selectQuestion}
	        		activeQuestion={this.state.activeQuestion}
	        	/>}
	        </div>
	    )
  	}
}

export default Faq;