import React from 'react';
// import { Link } from 'react-router';

// Import Style
import styles from './Header.css';

export function Header(props) {
  return (
    <header className={styles.header}>I'm a header! {JSON.stringify(props)}</header>
  );
}

Header.contextTypes = {
  router: React.PropTypes.object,
};

// Header.propTypes = {
//   // toggleAddPost: PropTypes.func.isRequired,
// };

export default Header;
