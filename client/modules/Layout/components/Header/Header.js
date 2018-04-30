import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {
  setLoggedIn,
  setLoggedOut,
  setAdmin,
} from '../../../../infrastructure/AuthActions';

// Import Style
import styles from './Header.css';
import logo from './Logo-ongray.png.png'

const storage = require('../../../../util/persistedStorage');
const tokenUtils = require('../../../../util/token.utils');


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

	componentWillMount() {
		this.checkAuth();	
	}

	checkAuth() {
		const token = tokenUtils.token();
		if(token) {
			if (!tokenUtils.isExpired(token)) {
				this.setState({	
					loggedIn: true,
					isAdm: tokenUtils.isAdmin(token),
				});
			} else {
				this.setState({	
					loggedIn: false,
					isAdm: false,
				});
				storage.remove(storage.Keys.JWT);
			}
		} else {
			this.setState({	
				loggedIn: false,
				isAdm: false,
			});
		}
	}

	adminMenu() {
		return (
			<div>
				<li className={active(this.context.router, "/manage", true)}><Link to="/manage" onClick={this.burgerToggle}>Admin</Link></li>
				<li className={active(this.context.router, "/manage/bookings", true)}><Link to="/manage/bookings" onClick={this.burgerToggle}>Manage Bookings</Link></li>
				<li className={active(this.context.router, "/manage/cars", true)}><Link to="/manage/cars" onClick={this.burgerToggle}>Manage Cars</Link></li>
				<li className={active(this.context.router, "/manage/locations", true)}><Link to="/manage/locations" onClick={this.burgerToggle}>Manage Locations</Link></li>
				<li className={active(this.context.router, "/manage/users", true)}><Link to="/manage/users" onClick={this.burgerToggle}>Manage Users</Link></li>
				<li className={active(this.context.router, "/manage/offers", true)}><Link to="/manage/offers" onClick={this.burgerToggle}>Manage Offers</Link></li>
			</div>
				
			
		);
	}

	render(){
		console.log('isAdmin, loggedIn', this.props.isAdmin, this.props.loggedIn);
		const adm = this.props.isAdmin && this.props.loggedIn ? this.adminMenu() : '';
		return (
	  		<header className={styles.header}>
					<a className={styles.burgerImageWrap} onClick={this.burgerToggle} >
			    	<div className={styles.burgerImage}></div>
					</a>
			    <ul className={styles.ul} style={{display:this.state.menuIsVisible ? "block" : "none"}}>
		    		<li className={active(this.context.router, "/", true)}><Link to="/" onClick={this.burgerToggle}>Home</Link></li>
					<li className={active(this.context.router, "/cars", true)}><Link to="/cars" onClick={this.burgerToggle}>Cars</Link></li>
					<li className={active(this.context.router, "/locations", true)}><Link to="/locations" onClick={this.burgerToggle}>Locations</Link></li>
					<li className={active(this.context.router, "/faq", true)}><Link to="/faq" onClick={this.burgerToggle}>FAQ</Link></li>
					<li className={active(this.context.router, "/terms", true)}><Link to="/terms" onClick={this.burgerToggle}>Terms and Conditions</Link></li>
					<li className={active(this.context.router, "/contact", true)}><Link to="/contact" onClick={this.burgerToggle}>Contact Us</Link></li>
					<li className={active(this.context.router, "/about", true)}><Link to="/about" onClick={this.burgerToggle}>About Us</Link></li>
			    	<li className={active(this.context.router, "/specials", true)}><Link to="/specials" onClick={this.burgerToggle}>Special Offers</Link></li>
					<li className={active(this.context.router, "/emergency", true)}><Link to="/emergency" onClick={this.burgerToggle}>Emergency Contact</Link></li>
			    {adm}
					{this.props.loggedIn ? '' : <li className={active(this.context.router, "/login", true)}><Link to="/login" onClick={this.burgerToggle}>Login</Link></li>
					}
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

Header.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
  isAdmin: PropTypes.bool.isRequired,
};


const mapStateToProps = (state) => {
  return {
		loggedIn: state.auth.loggedIn,		
		isAdmin: state.auth.isAdmin,		
  };
};

const mapDispatchToProps = dispatch => bindActionCreators({
  //dispatch,
  setLoggedIn,
  setLoggedOut,
  setAdmin,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Header);
