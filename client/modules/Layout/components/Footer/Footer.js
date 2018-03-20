import React from 'react';
import { Link } from 'react-router';

// Import Style
import styles from './Footer.css';

export function Footer() {
  return (
    <footer className={styles.footer}>
      <Link to="/home">www.shacar.com.au</Link><br />
    	<Link to="/termsandconditions">Terms and Conditions of use</Link>
    </footer>
  );
}

Footer.contextTypes = {
  router: React.PropTypes.object,
};

export default Footer;
