import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

// Import Style
import styles from './Header.css';


//Helper to set the header active
function active(router, path, indexOnly){
	return router.isActive(path, indexOnly)? styles.active : null; 
}

export class Header extends Component{

	constructor(props){
		super(props);
		this.state = {menuIsVisible:false};
	}

	burgerToggle(){
		this.setState({
			menuIsVisible: !this.state.menuIsVisible,
		});
	}

	render(){
		return (
		    <header className={styles.header}>
			    <div onClick={() => this.burgerToggle()} className={styles.burgerImage}></div>
			    <ul style={{display:this.state.menuIsVisible ? "block" : "none"}}>
		    		<li className={active(this.context.router, "/", true)}><Link to="/">Home</Link></li>
		    		<li className={active(this.context.router, "/faq", true)}><Link to="/faq">FAQ</Link></li>
			    </ul>
			    <div className={styles.siteLogo}>
			    	<h1>Sha<span>Car</span></h1>
			    </div>
		    </header>
  		);
	}

}

// Acces to router to show the active page
Header.contextTypes = {
  router: React.PropTypes.object,
};


export default Header;
