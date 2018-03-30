//Import react
import React, { Component, PropTypes } from 'react';

import styles from './Home.css'
import carIcon from './car-icon.png'

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
          <div className={styles.tagLine+" row no-gutters d-none d-md-block"}>
                ShaCar vehicle share service, we love cars and want to share them with you
          </div>
          <div className="row no-gutters">
            <div className="col-md-2"></div>
            <div className="col-md-10">
              <div className={styles.bannerText}>
                &ldquo;We put the share in ShaCar.&rdquo;
              </div>
            </div>
          </div>
        </div>
        <div className="row no-gutters d-none d-md-block">
          <div className={styles.separator}></div>
        </div>
        <div className="row no-gutters d-none d-md-flex">
            <div className={styles.btn1md+" col"}>
              <img className={styles.icons} src={carIcon}/><h3>Locations</h3>
            </div>

            <div className={styles.btn2md+" col"}>
              <img className={styles.icons} src={carIcon}/><h3>Cars</h3>
            </div>
        </div>
        <div className="row no-gutters d-none d-md-flex">
            <div className={styles.btn3md+" col"}>
              <img className={styles.icons} src={carIcon}/><h3>About</h3>
            </div>

            <div className={styles.btn4md+" col"}>
              <img className={styles.icons} src={carIcon}/><h3>Contact us</h3>
            </div>
        </div>
        <div className="row no-gutters d-xs-block d-md-none">
            <div className={styles.btnSm1+" col-xs-12"}>
              <img className={styles.icons} src={carIcon}/><h3>Locations</h3>
            </div>

            <div className={styles.btnSm2+" col-xs-12"}>
              <img className={styles.icons} src={carIcon}/><h3>Cars</h3>
            </div>

            <div className={styles.btnSm1+" col-xs-12"}>
              <img className={styles.icons} src={carIcon}/><h3>About</h3>
            </div>

            <div className={styles.btnSm2+" col-xs-12"}>
              <img className={styles.icons} src={carIcon}/><h3>Contact us</h3>
            </div>
        </div>
      </div>
    );
  }
}

export default Home;
