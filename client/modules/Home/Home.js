//Import react
import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

import Gallery from './components/Gallery'
import styles from './Home.css'
import carIcon from './car2.svg.png'
import locIcon from './pin-3.svg.png'
import aboutIcon from './question_answer.svg.png'
import contIcon from './speech-alt-4.svg.png'

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
          <Gallery />
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
          <div className={styles.bigArrows+" d-none d-md-block"}></div>
        </div>
        <div className="row no-gutters d-none d-md-block">
          <div className={styles.separator}></div>
        </div>
        <div className="row no-gutters d-none d-md-flex">
            <Link to="/locations" className={styles.btn1md+" col"}>
              <img className={styles.icons} src={locIcon}/><h3>Locations</h3>
            </Link>

            <Link to="/cars" className={styles.btn2md+" col"}>
              <img className={styles.icons} src={carIcon}/><h3>Cars</h3>
            </Link>
        </div>
        <div className="row no-gutters d-none d-md-flex">
            <Link to="/about" className={styles.btn3md+" col"}>
              <img className={styles.icons} src={aboutIcon}/><h3>About</h3>
            </Link>

            <Link to="/contact" className={styles.btn4md+" col"}>
              <img className={styles.icons} src={contIcon}/><h3>Contact us</h3>
            </Link>
        </div>
        <div className="row no-gutters d-xs-block d-md-none">
            <Link to="/locations" className={styles.btnSm1+" col-xs-12"}>
              <img className={styles.icons} src={locIcon}/><h3>Locations</h3>
            </Link>

            <Link to="/cars"  className={styles.btnSm2+" col-xs-12"}>
              <img className={styles.icons} src={carIcon}/><h3>Cars</h3>
            </Link>

            <Link to="/about"className={styles.btnSm1+" col-xs-12"}>
              <img className={styles.icons} src={aboutIcon}/><h3>About</h3>
            </Link>

            <Link to="/contact" className={styles.btnSm2+" col-xs-12"}>
              <img className={styles.icons} src={contIcon}/><h3>Contact us</h3>
            </Link>
        </div>
      </div>
    );
  }
}

export default Home;
