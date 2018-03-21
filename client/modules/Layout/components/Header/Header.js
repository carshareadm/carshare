import React from 'react';
import { Link } from 'react-router';

// Import Style
import styles from './Header.css';


//Helper to set the header active
function active(router, path, indexOnly){
	return router.isActive(path, indexOnly)? styles.active : null; 
}

// Functional component (function)
export function Header(props, context) {
  return (
    <header className={styles.header}>
	    <div className={styles.burgerImage}>
	    </div>
	    <ul>
    		<li className={active(context.router, "/", true)}><Link to="/">Home</Link></li>
    		<li className={active(context.router, "/faq", true)}><Link to="/faq">FAQ</Link></li>
	    </ul>
	    <div className={styles.siteLogo}>
	    	<h1>Sha<span>Car</span></h1>
	    </div>
    </header>
  );
}

// Acces to router to show the active page
Header.contextTypes = {
  router: React.PropTypes.object,
};


export default Header;
