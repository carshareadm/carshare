import React from 'react';
import { Link } from 'react-router';

// Import Style
import styles from './Footer.css';

export function Footer() {
  return (
    <footer className={styles.footer}>
    		<Link to="/">Contact Us</Link> &copy; 2018 RMIT PP1 Group 3
    </footer>
  );
}

export default Footer;
