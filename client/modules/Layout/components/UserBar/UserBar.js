import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

// Import Style
import styles from './UserBar.css';

export class UserBar extends Component{

	constructor(props){
		super(props);
		this.state = {
			formIsVisible:false,
			loggedIn:false,
		};

		//Bind the function to the class
		this.formToggle = this.formToggle.bind(this);
		this.executeLogin = this.executeLogin.bind(this);
	}

	formToggle(){
		this.setState({
			formIsVisible: !this.state.formIsVisible,
		});
	}

	loggedInBar(){
		return (
			<div className={styles.bar}>
			    <h3>
			    	<span className={styles.barItem}>	
			    		Welcome to ShaCar
			    	</span>
			    </h3>
			</div>
		);
	}

	executeLogin(event){
		event.preventDefault();
		const login = document.getElementById("login").value;
		const pass = document.getElementById("password").value;

		// Won't work in IE for now
		fetch('/api/account/login', {
			method: 'POST',
			headers: {'content-type':'application/json'},
			body: JSON.stringify({email: login, password: pass}),
		})
		.then((response) => {
			if(!response.ok){
				console.error("Something went wrong ",response);
				return;
			}
			this.setState({
				loggedIn: true,
			});
		})

	}

	loginFrm(){
		return (
			<div className={styles.bar}>
			    <h3>
			    	<span className={styles.barItem} onClick={this.formToggle}>Login</span>
			    	{this.state.formIsVisible ? 
			    		null :
				    	<span className={styles.barItem}>	
				    		&nbsp;or&nbsp;
				    		<Link className={styles.barItem_link} to="/register">Register</Link>
				    	</span>
			    	}
			    </h3>
			    <form style={{display:this.state.formIsVisible ? "block" : "none"}} onSubmit={this.executeLogin}>
		            <label className={styles.labels} htmlFor="login">
		                <div className={styles.labelText}>Login</div>
		                <input type="text" name="login" id="login" />
		            </label>
		            <label className={styles.labels} htmlFor="password">
		                <div className={styles.labelText}>Password</div>
		                <input type="text" name="password" id="password"/>
		            </label>
		            <input type="submit" value="Submit" />
		    	</form>
		    </div>
		);
	}

	render(){
		return this.state.loggedIn ? this.loggedInBar() : this.loginFrm();
	}

}

// Acces to router to show the active page
UserBar.contextTypes = {
  router: React.PropTypes.object,
};


export default UserBar;
