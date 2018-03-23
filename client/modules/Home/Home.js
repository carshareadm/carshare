//Import react
import React, { Component, PropTypes } from 'react';

import styles from './Home.css'

//Create a component class
export class Home extends Component {
  // constructor(props) {
  //   super(props);
  // }

  render() {
    // Here goes our page
    return (
      <div className={styles.home}>
        <div className={styles.banner}>
          <div className={styles.bannerText}>
            &ldquo;We put the share in ShaCar.&rdquo;
          </div>
        </div>

        <div className={styles.location}>
          <h2>Locate Available Vehicles</h2>
        </div>

        <div className={styles.register}>
          <h2>Register</h2>
        </div>

        <div className={styles.about}>
          <h2>What is ShaCar</h2>
        </div>
      </div>
    );
  }
}

export default Home;
