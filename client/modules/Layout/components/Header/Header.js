import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

// Import Style
import styles from './Header.css';
import logo from './Logo-ongray.png.png'

const storage = require('../../../../util/persistedStorage');


//Helper to set the header active
function active(router, path, indexOnly){
	return router.isActive(path, indexOnly)? styles.active : null; 
}

export class Header extends Component{

	constructor(props){
		super(props);
		this.state = {
			isAdm: false,
			loggedIn: false,
			menuIsVisible:false,
		};

		//Bind the function to the class
		this.burgerToggle = this.burgerToggle.bind(this);
	}

	burgerToggle(){
		this.setState({
			menuIsVisible: !this.state.menuIsVisible,
		});
	}

	componentDidMount() {
		if(storage.get(storage.Keys.JWT))
		{
			this.setState({	loggedIn:true });
			this.state.isAdm=JSON.parse(atob(window.localStorage.getItem('JWT').split('.')[1]))['isAdmin'];
		}
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
					<li className={active(this.context.router, "/cars", true)}><Link to="/cars" onClick={this.burgerToggle}>Cars</Link></li>
					<li className={active(this.context.router, "/locations", true)}><Link to="/locations" onClick={this.burgerToggle}>Locations</Link></li>
					{this.state.isAdm ?
					<li className={active(this.context.router, "/manage", true)}><Link to="/manage" onClick={this.burgerToggle}>Manage</Link></li> : ''
					}
					{this.state.loggedIn ? '' : <li className={active(this.context.router, "/login", true)}><Link to="/login" onClick={this.burgerToggle}>Login</Link></li>
					}
		    		<li className={active(this.context.router, "/faq", true)}><Link to="/faq" onClick={this.burgerToggle}>FAQ</Link></li>
		    		<li className={active(this.context.router, "/terms", true)}><Link to="/terms" onClick={this.burgerToggle}>Terms and Conditions</Link></li>
		    		<li className={active(this.context.router, "/contact", true)}><Link to="/contact" onClick={this.burgerToggle}>Contact Us</Link></li>
					<li className={active(this.context.router, "/about", true)}><Link to="/about" onClick={this.burgerToggle}>About Us</Link></li>
			    </ul>
			    <div className={styles.siteLogo}>
			    <Link to="/">
			    	<img className={styles.logo} src={logo}/>
			    	</Link>

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
