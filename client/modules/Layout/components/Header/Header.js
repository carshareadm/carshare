import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

// Import Style
import styles from './Header.css';
import logo from './Logo-ongray.png.png'


//Helper to set the header active
function active(router, path, indexOnly){
	return router.isActive(path, indexOnly)? styles.active : null; 
}

export class Header extends Component{

	constructor(props){
		super(props);
		this.state = {menuIsVisible:false};

		//Bind the function to the class
		this.burgerToggle = this.burgerToggle.bind(this);
	}

	burgerToggle(){
		this.setState({
			menuIsVisible: !this.state.menuIsVisible,
		});
	}

	render(){
		return (
	  		<header className={styles.header}>
					<a className={styles.burgerImageWrap} onClick={this.burgerToggle} >
			    	<div className={styles.burgerImage}></div>
					</a>
			    	{/* <div onClick={this.burgerToggle} className={styles.burgerImage}></div> */}
			    <ul className={styles.ul} style={{display:this.state.menuIsVisible ? "block" : "none"}}>
		    		<li className={active(this.context.router, "/", true)}><Link to="/" onClick={this.burgerToggle}>Home</Link></li>
					<li className={active(this.context.router, "/booking", true)}><Link to="/booking" onClick={this.burgerToggle}>Booking</Link></li>
					<li className={active(this.context.router, "/profile", true)}><Link to="/profile" onClick={this.burgerToggle}>Profile</Link></li>
		    		<li className={active(this.context.router, "/faq", true)}><Link to="/faq" onClick={this.burgerToggle}>FAQ</Link></li>
		    		<li className={active(this.context.router, "/terms", true)}><Link to="/terms" onClick={this.burgerToggle}>Terms and Conditions</Link></li>
		    		<li className={active(this.context.router, "/contact", true)}><Link to="/contact" onClick={this.burgerToggle}>Contact Us</Link></li>
					<li className={active(this.context.router, "/about", true)}><Link to="/about" onClick={this.burgerToggle}>About Us</Link></li>
			    </ul>
			    <div className={styles.siteLogo}>
			    	<img className={styles.logo} src={logo} />
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
