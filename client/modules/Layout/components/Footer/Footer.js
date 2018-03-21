import React from 'react';
import { Link } from 'react-router';

// Import Style
import styles from './Footer.css';

export function Footer(props) {
  return (
    <footer className={styles.footer}>
      <Link to="/">www.shacar.com.au</Link><br />
    	<Link to="/termsandconditions">Terms and Conditions of use</Link>
    </footer>
  );
}

Footer.contextTypes = {
  router: React.PropTypes.object,
  /* 
  Reference to router
  */
};

export default Footer;
