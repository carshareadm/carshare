import React from 'react';
import { Link } from 'react-router';

// Import Style
import styles from './Header.css';

export function Header(props) {
  return (
    <header className={styles.header}>
    	<ul>
    		<li><Link to="/">Home</Link></li>
    		<li><Link to="/faq">FAQ</Link></li>
    	</ul>

    </header>
  );
}

Header.contextTypes = {
  router: React.PropTypes.object,
};


export default Header;
