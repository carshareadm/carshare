//Import react
import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import {
  Button,
  FormGroup,
  Label,
  Input,
  FormText,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Container,
  Row,
  Col,
} from "reactstrap";

import Gallery from './components/Gallery'
import styles from './Specials.css'
import stylesMain from "../../main.css"

//Create a component class
export class Specials extends Component {
  // constructor(props) {
  //   super(props);
  // }

  render() {
    // Here goes our page
    return (
      <div className={stylesMain.body}>
        <div className={styles.banner}>
          <Gallery />
        </div>
        <div className="row no-gutters d-none d-md-block">
          <div className={styles.separator}></div>
        </div>
        <h1 className={stylesMain.title}>Special Offers</h1>
  
        <Row noGutters>
          <Col xs="12" md="6" className="px-3">
          
            <p><strong>Enquire about our Special weekend rates</strong><br/></p>
            <p>Receive upto 50% off on weekend rates over 24 hours.  Contact us to arrange.<br/></p>

            <p><Link to="/contact">Contact Us</Link></p>

          </Col>
          <Col xs="12" md="6" className="px-3">
          <p><strong>Do you need a child seat?</strong><br/></p>
            <p>No worries...... We have that covered, contact us to arrange a child seat.<br/></p>

            <p><Link to="/contact">Contact Us</Link></p>
          </Col>
          </Row>
           
</div>

    );
  }
}

export default Specials;
