/**
 * Project       - ShaCar
 * Team          - Group 3 Carshare
 * Last Modified - 2018/05/25
 * Authors
 *               - Paul Crow
 *               - Inga Pflaumer
 *               - Tianqi Chen
 *               - Jason Koh
 */
import React, { Component, PropTypes } from "react";
import { Link } from "react-router";
import {
  Button,
  FormGroup,
  Label,
  Input,
  FormText,
  Card,
  CardBody,
  CardHeader,
  CardText,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Container,
  Row,
  Col,
} from "reactstrap";

import StatBlock from './Statistics/StatBlock';
import stylesMain from "../../main.css";
import styles from "./Manage.css";

import i_avatar from '../images/i_avatar.png';
import i_booking from '../images/i_booking.png';
import i_car from '../images/i_car.png';
import i_chart from '../images/i_chart.png';
import i_pin from '../images/i_pin.png';
import i_enquiry from '../images/i_enquiry.png';

const stats = [
  { title: 'Bookings', api: 'bookings', img: i_booking },
  { title: 'Cars', api: 'cars', img: i_car },
  { title: 'Damages', api: 'damages', img: i_chart },
  { title: 'Locations', api: 'locations', img: i_pin },
  { title: 'Users', api: 'users', img: i_avatar },
  { title: 'Enquiries', api: 'enquiries', img: i_enquiry },
];

//Manage component class
export class Manage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      isAdm: false,
    };
  }
  componentDidMount() {
    if (window.localStorage.getItem("JWT")) this.setState({ loggedIn: true });
    this.state.isAdm = JSON.parse(
      atob(window.localStorage.getItem("JWT").split(".")[1])
    )["isAdmin"];
  }

  render() {
    return this.state.isAdm ? this.ManageFrm() : this.register();
  }
  register() {
    return (
      <div className={stylesMain.body}>
        <h1 className={stylesMain.title}>Insufficient Access</h1>
        <p>
          <Link to="/">Redirecting to previous page</Link>
          <br />
        </p>
      </div>
    );
  }

  ManageFrm() {
    // Here goes our page
		const bodyClasses = `${stylesMain.body} ${styles.noBg}`;
		const titleClasses = `${stylesMain.title} ${styles.noBgTitle}`;
    return (
      <div className={bodyClasses}>
        <Container>
          <Row>
            <Col lg="12">
              <h1 className={titleClasses}>Management Console</h1>
            </Col>
          </Row>
          <Row>
            {stats.map(m => <StatBlock key={m.title} title={m.title} api={m.api} img={m.img} />)}
          </Row>
        </Container>
      </div>
    );
  }
}

export default Manage;
