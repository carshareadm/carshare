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
	        	<h3 onClick={this.itemToggle}>{this.props.question}</h3> 
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
	        	<h2>Registration</h2>
		        <FaqItem question="How to use ShaCar?">
		        	<div>
						<p>Question 1 answer: Lorem ipsum dolor sit amet, consectetur
						adipiscing elit. Cras nunc dui, condimentum ut venenatis in,
						condimentum vestibulum mi. Sed lobortis sapien vitae est blandit, sed
						euismod turpis tincidunt. Fusce tincidunt imperdiet tellus vitae
						ultrices. Integer sed turpis condimentum, condimentum velit eget,
						consequat nibh. Nunc id augue dui.</p>
		        	</div>
		        </FaqItem>

	        	<FaqItem question="I've registered, what now?">
		        	<div>
						<p>Question 2 answer: Lorem ipsum dolor sit amet, consectetur
						adipiscing elit. Cras nunc dui, condimentum ut venenatis in,
						condimentum vestibulum mi. Sed lobortis sapien vitae est blandit, sed
						euismod turpis tincidunt. Fusce tincidunt imperdiet tellus vitae
						ultrices. Integer sed turpis condimentum, condimentum velit eget,
						consequat nibh. Nunc id augue dui.</p>
		        	</div>
	        	</FaqItem>
				<br />
	        	<h2>Sharing a car</h2>
	        	<FaqItem question="Question 3">
		        	<div>
						<p>Question 3 answer: Lorem ipsum dolor sit amet, consectetur
						adipiscing elit. Cras nunc dui, condimentum ut venenatis in,
						condimentum vestibulum mi. Sed lobortis sapien vitae est blandit, sed
						euismod turpis tincidunt. Fusce tincidunt imperdiet tellus vitae
						ultrices. Integer sed turpis condimentum, condimentum velit eget,
						consequat nibh. Nunc id augue dui.</p>
		        	</div>
	        	</FaqItem>
				
	        </div>
	    );
  }
}

export default Faq;