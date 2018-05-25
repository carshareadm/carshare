/**
 * Project       - ShaCar
 * Team          - Group 3 Carshare
 * Last Modified - 2018/05/25
 * Authors
 *               - Tianqi Chen
 *               - Matthew Ryan
 */
//Import react
import React, { Component, PropTypes } from "react";
import { Link } from "react-router";
import {
  Button,
  FormGroup,
  Label,
  Input,
  Card,
  CardHeader,
  CardBody,
  CardText,
  FormText,
  Container,
  Row,
  Col,
  Form,
  Alert,
  FormFeedback,
  Tooltip,
} from "reactstrap";
import * as http from "../../util/http";

import moment from "moment";

const storage = require("../../util/persistedStorage");

import styles from "./Extension.css";
import stylesMain from "../../main.css";
import TimeTable from "./components/TimeTable";

const nonDigit = /[^0-9]/g;
//Booking component class
export class Extension extends Component {
  intervalNum = 60;
  intervalUnit = "minutes";

  startTime = moment()
    .startOf("hour")
    .add(1, "hours");
  endTime = moment()
    .startOf("hour")
    .add(2, "hours");

  startDate = moment()
    .startOf("hour")
    .add(1, "hours");

  tmpCost = 0;

  constructor(props) {
    super(props);
    this.state = {
      bookingId: "",
      userid: "",
      booking: {},
      startDate: this.startTime,
      endDate: this.endTime,
      loggedIn: false,
      extended: false,
      cost: 0,
      expectedCost: 0,
      alert: {
        couponSuccess: false,
        couponError: false,
        bookingError: false,
      },
      input: {
        ccv: "",
        offerCode: "",
      },
      discount: {},

      validated: true,

      touched: {
        startDate: false,
        endDate: false,
        ccv: false,
      },
    };
  }
  //Set up variables for Msgs

  labels = {
    startDate: "Start Time",
    endDate: "End Time",
  };

  errorMsgs = {
    startDate:
      "a valid date and time at least 1 hour in the future is required",
    endDate: "a date and time after start time is required",
  };

  errors = {};

  componentDidMount() {
    const token = storage.get(storage.Keys.JWT);
    if (token) {
      this.setState({
        loggedIn: true,
        userid: JSON.parse(atob(token.split(".")[1]))["sub"],
      });
    }
    this.setState({ bookingId: this.props.params.extend });
    http
      .client()
      .get("/booking/"+this.props.params.extend)
      .then(res => {
        this.setState({ booking: res.data });
      })
      .catch(err => {
        console.log(err);
      });
  }

  expectedCostCal(start, end, discount) {
    var hours = "";
    if (start == 0) start = this.state.startDate;
    if (end == 0) end = this.state.endDate;
    if (discount == 0) discount = this.state.discount;

    hours = moment
      .duration(
        moment(end, "YYYY/MM/DD HH:mm").diff(moment(start, "YYYY/MM/DD HH:mm"))
      )
      .asHours();
    this.tmpCost = hours * this.state.booking.car.vehicleType.hourlyRate;
    if (discount.multiplier) {
      this.tmpCost = (100 - discount.multiplier) / 100 * this.tmpCost;
    }
    if (discount.oneOffValue) {
      this.tmpCost = this.tmpCost - discount.oneOffValue;
    }
    if (this.tmpCost > 0) {
      this.setState({ expectedCost: this.tmpCost });
    }
  }

  // WIP
  handleExtend(evt, change) {
    evt.preventDefault();
    console.log(this.state.bookingId);
    if(change=='add')
    {
      var newEnd = moment(this.state.booking.endsAt).add(1,'h');
    }
    else
    {
      var newEnd = moment(this.state.booking.endsAt).subtract(1,'h');
    }
    var hours = moment
    .duration(
            moment(newEnd, "YYYY/MM/DD HH:mm").diff(
            moment(this.state.booking.startsAt, "YYYY/MM/DD HH:mm")
           )
    ).asHours();
    console.log(hours);
    console.log(this.state.booking.startsAt);
    console.log(this.state.booking.endsAt);
      http
        .client()
        .put("/booking/extend", {
          bookid: this.state.bookingId,
          endAt: newEnd,
          startAt: this.state.booking.startsAt,
        })
        .then(res => {
          this.setState({ booking: res.data });
          this.setState({ cost: res.data.totalCost });
          this.setState({ extended: true });
          console.log(res.data);
        })
        .catch(err => {
          console.log(err);
          this.sendAlert("bookingError");
        });
  }

  renderLabel(key, labelFor) {
    /*
    if (this.isError(key)) {
      return (
        <Label htmlFor={labelFor} className={"text-danger"}>
          {this.labels[key]}: {this.errorMsgs[key]}
        </Label>
      );
    }
    */

    return <Label htmlFor={labelFor}>{this.labels[key]}</Label>;
  }

  register() {
    return (
      <div className={stylesMain.bodyFullPage}>
        <h1 className={stylesMain.title}>Please Register</h1>
        <p>
          <Link to="/register">Click here to go to Register</Link>
          <br />
        </p>
      </div>
    );
  }
  goback() {
    return (
      <div className={stylesMain.bodyFullPage}>
        <h1 className={stylesMain.title}>No booking was selected</h1>
        <p>
          <Link to={window.history.back()}>Redirecting to previous page</Link>
          <br />
        </p>
      </div>
    );
  }

  sendAlert(field) {
    this.setState({
      alert: Object.assign({}, this.state.alert, { [field]: true }),
    });
  }

  dismissAlert(field, evt) {
    this.setState({
      alert: Object.assign({}, this.state.alert, { [field]: false }),
    });
  }

  extended() {
    return (
      <Container className={stylesMain.bodyFullPage}>
        <h1 className={stylesMain.title}>Booking Extension Success</h1>
        <Row>
          <Col sm="12" md="6">
            <hr />
            <Card>
              <CardHeader tag="h5">
                {this.state.booking.car.year} {this.state.booking.car.make}{" "}
                {this.state.booking.car.model} ({this.state.booking.car.colour}){" "}
                <br />
                <span className="text-muted">
                  {this.state.booking.car.location.name}
                </span>
              </CardHeader>
              <CardBody>
                <CardText>
                  Vehicle type: {this.state.booking.car.vehicleType.name},{" "}
                  {this.state.booking.car.doors} doors<br />
                  Seats: {this.state.booking.car.seats}
                  <br />
                  Hourly rate: ${this.state.booking.car.vehicleType.hourlyRate.toFixed(
                    2
                  )}
                  <br />
                  Registration: {this.state.booking.car.rego}
                </CardText>
              </CardBody>
            </Card>
          </Col>
          <Col sm="12" md="6">
            <hr />

                <h1 className={stylesMain.subtitle}>Your booking has been updated </h1><br />
                <h4 className={stylesMain.h4}>New booking time</h4>
                <br />
                Start Time: 
                <strong>
                  {" " +
                    moment(this.state.booking.startsAt)
                      .format("MMMM Do YYYY HH:mm")
                      .toString() +
                    " "}
                </strong> <br />
                <br />
                End Time: 
                <strong>
                  {" " +
                    moment(this.state.booking.endsAt).format("MMMM Do YYYY HH:mm").toString() +
                    " "}
                </strong>
                <br />
                 <br />
                New Booking Cost : <strong> ${this.state.cost.toFixed(
                    2)} </strong>
            <br />
            <br />
             <Button className={stylesMain.buttonSquareOutlineGrey} href="/">Click here to return home</Button>
             
          </Col>
        </Row>
      </Container>
    );
  }

  bookingFrm() {
    return (
      <Container className={stylesMain.bodyFullPage}>
        <Row>
          <Col>
            <h1 className={stylesMain.title}>Booking Extension</h1>
          </Col>
        </Row>
        <Alert
          color="danger"
          isOpen={this.state.alert.bookingError}
          toggle={e => this.dismissAlert("bookingError", e)}
        >
          Sorry, we are unable to extend your booking.
        </Alert>
        <Row>
          <Col sm="12" md="6">
            <hr />
            <Card>
              <CardHeader tag="h5">
                {this.state.booking.car.year} {this.state.booking.car.make}{" "}
                {this.state.booking.car.model} ({this.state.booking.car.colour}){" "}
                <br />
                <span className="text-muted">
                  {this.state.booking.car.location.name}
                </span>
              </CardHeader>
              <CardBody>
                <CardText>
                  Vehicle type: {this.state.booking.car.vehicleType.name},{" "}
                  {this.state.booking.car.doors} doors<br />
                  Seats: {this.state.booking.car.seats}
                  <br />
                  Hourly rate: ${this.state.booking.car.vehicleType.hourlyRate.toFixed(
                    2
                  )}
                  <br />
                  Registration: {this.state.booking.car.rego}
                </CardText>
              </CardBody>
            </Card>
          </Col>
          <Col sm="12" md="6">
            <hr />
            <h4 className={stylesMain.h4}>Current Booking</h4>
              {this.renderLabel("startDate", "startDate")}
              :<strong> {moment(this.state.booking.startsAt)
              .format("MMMM Do YYYY HH:mm")
              .toString()}</strong>
              <br />
              {this.renderLabel("endDate", "endDate")}
              :<strong> {moment(this.state.booking.endsAt)
              .format("MMMM Do YYYY HH:mm")
              .toString()}</strong>
              <br />
            Current Booking Price : <strong>$ {this.state.booking.totalCost.toFixed(2)}</strong>
            <br />
            <br />
            <h4 className={stylesMain.h4}>Press the below button to add an additional hour to the booking </h4>
            <br />
              <Button className={stylesMain.buttonSquareOutlineGrey} onClick={(e) => this.handleExtend(e, 'add')}>+1 hour</Button>
              &nbsp;

          </Col>
        </Row>
      </Container>
    );
  }

  render() {
    if (!this.props.params.extend) return this.goback();
    else {
      if (!this.state.loggedIn) return this.register();
      else if (this.state.extended)
        return this.extended();
      else return this.bookingFrm();
    }
  }
}

export default Extension;
