import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

// Import Style
import styles from './UserBar.css';

export class UserBar extends Component{

	constructor(props){
		super(props);
		this.state = {formIsVisible:false};

		//Bind the function to the class
		this.formToggle = this.formToggle.bind(this);
	}

	formToggle(){
		this.setState({
			formIsVisible: !this.state.formIsVisible,
		});
	}

	render(){
		return (
		    <div className={styles.bar}>
			    <h3>
			    	<span className={styles.barItem} onClick={this.formToggle}>Login</span> 
			    	<span className={styles.barItem}>	
			    		&nbsp;or&nbsp;
			    		<Link className={styles.barItem_link} to="/faq">Register</Link>
			    	</span>
			    </h3>
			    <form style={{display:this.state.formIsVisible ? "block" : "none"}}>
	                <label className={styles.labels} for="login">
	                    <div className={styles.labelText}>Login</div>
	                    <input type="text" name="login" id="login" />
	                </label>
	                <label className={styles.labels} for="password">
	                    <div className={styles.labelText}>Password</div>
	                    <input type="text" name="password" id="password"/>
	                </label>
	                <input type="submit" value="Submit" />
            	</form>
		    </div>
  		);
	}

}

// Acces to router to show the active page
UserBar.contextTypes = {
  router: React.PropTypes.object,
};


export default UserBar;
