import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

// Import Style
import styles from './UserBar.css';

export class UserBar extends Component{

	constructor(props){
		super(props);
	}

	render(){
		return (
		    <div className={styles.bar}>
		    <h2>Login</h2>
		    </div>
  		);
	}

}

// Acces to router to show the active page
UserBar.contextTypes = {
  router: React.PropTypes.object,
};


export default UserBar;
