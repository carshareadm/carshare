//Import react
import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

import Gallery from './components/Gallery'
import styles from './Specials.css'
import stylesMain from "../../main.css";

//Create a component class
export class Specials extends Component {
  // constructor(props) {
  //   super(props);
  // }

  render() {
    // Here goes our page
    return (
      <div className={styles.home}>
        <div className={styles.banner}>
          <Gallery />
        </div>
        <div className="row no-gutters d-none d-md-block">
          <div className={styles.separator}></div>
        </div>
         <div className={styles.body}>
          <h1 className={styles.title}>Special Offers</h1>
          <row>
            <p><strong>Enquire about our Special weekend rates</strong><br/></p>
            <p>Upto 50% off on weekend rates over 24 hours.<br/></p>

            <p><Link to="/contact">Contact Us</Link></p>


          <p><strong>Do you need a child seat</strong><br/></p>
            <p>No worries...... We have that covered contact us to arrange.<br/></p>

            <p><Link to="/contact">Contact Us</Link></p>
          </row>
            </div>
</div>

    );
  }
}

export default Specials;
