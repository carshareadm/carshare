/**
 * Project       - ShaCar
 * Team          - Group 3 Carshare
 * Last Modified - 2018/05/25
 * Authors
 *               - Inga Pflaumer
 *               - Tianqi Chen
 */
//Import react
import React, { Component, PropTypes } from "react";
import { Link } from "react-router";
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
  Alert,
} from "reactstrap";
import * as http from "../../util/http";

import styles from "./History.css";
import stylesMain from "../../main.css";

import HistoryItem from "./components/HistoryItem";

const storage = require("../../util/persistedStorage");

export class History extends Component {
  constructor(props) {
    super(props);
	this.setBookings = this.setBookings.bind(this);
	this.sendAlert = this.sendAlert.bind(this);
	this.dismissAlert = this.dismissAlert.bind(this);
    this.state = {
      bookings: [],
	  userid: "",
	  alert: {
        cancelSuccess: false,
        cancelError: false,
      },
    };
  }

  componentDidMount() {
    this.setBookings();
    const token = storage.get(storage.Keys.JWT);
    if (token) {
      this.setState({
        userid: JSON.parse(atob(token.split(".")[1]))["sub"],
      });
    }
  }

  sendAlert(field) {
    this.setState({
      alert: Object.assign({}, this.state.alert, { [field]: true }),
    });
  }

  dismissAlert(field) {
    this.setState({
      alert: Object.assign({}, this.state.alert, { [field]: false }),
    });
  }

  setBookings() {
    http
      .client()
      .get(`/profile/bookings`)
      .then(res => {
        //save requested bookings to state
        this.setState({
          bookings: res.data,
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    return (
      <div className={stylesMain.body}>
        <Container>
          <h1 className={stylesMain.title}>Bookings</h1>
          <Row>
            <Col>
			<Alert
                color="success"
                isOpen={this.state.alert.cancelSuccess}
                toggle={e => this.dismissAlert('cancelSuccess')}
              >
                Thank you, booking cancelled.
              </Alert>
              <Alert
                color="danger"
                isOpen={this.state.alert.cancelError}
                toggle={e => this.dismissAlert('cancelError')}
              >
                Sorry, there was an error. Please retry.
              </Alert>
              {this.state.bookings.map(b => (
                <HistoryItem key={b._id} data={b} usr={this.state.userid} sendAlert={this.sendAlert} clearAlert={this.dismissAlert}/>
              ))}
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default History;
