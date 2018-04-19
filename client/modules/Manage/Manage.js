//Import react
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

import stylesMain from "../../main.css";
import styles from "./Manage.css";

import i_avatar from '../images/i_avatar.png';
import i_booking from '../images/i_booking.png';
import i_car from '../images/i_car.png';
import i_chart from '../images/i_chart.png';
import i_pin from '../images/i_pin.png';

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
            <Col>
              <h1 className={titleClasses}>Management Console</h1>
            </Col>
          </Row>
          <Row>
            <Col xs="6" sm="4" md="3" className={styles.linkCol}>
							<Link to="/manage/bookings">
								<img src={i_booking} />
								<span className={styles.linkTxt}>Bookings</span>
							</Link>
						</Col>
            <Col xs="6" sm="4" md="3" className={styles.linkCol}>
							<Link to="/manage/cars">
								<img src={i_car} />
								<span className={styles.linkTxt}>Cars</span>
							</Link>
						</Col>
            <Col xs="6" sm="4" md="3" className={styles.linkCol}>
							<Link to="/manage/locations">
								<img src={i_pin} />
								<span className={styles.linkTxt}>Locations</span>
							</Link>
						</Col>
            <Col xs="6" sm="4" md="3" className={styles.linkCol}>
							<Link to="/manage/users">
								<img src={i_avatar} />
								<span className={styles.linkTxt}>Users</span>
							</Link>
						</Col>
            {/* <Col xs="6" sm="4" md="3" className={styles.linkCol}>
							<Link to="/manage/bookings">
								<img src={i_booking} />
								<h4>Bookings</h4>
							</Link>
						</Col> */}
          </Row>          
        </Container>
      </div>
    );
  }
}

export default Manage;
