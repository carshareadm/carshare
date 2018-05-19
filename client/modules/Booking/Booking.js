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

import DatePicker from "react-datepicker";

import moment from "moment";

const storage = require("../../util/persistedStorage");

import styles from "./Booking.css";

import TimeTable from "./components/TimeTable";

const nonDigit = /[^0-9]/g;
//Booking component class
export class Booking extends Component {
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
      carid: "",
      userid: "",
      selectedCar: {},
      selectedLocation: {},
      startDate: this.startTime,
      endDate: this.endTime,
      loggedIn: false,
      booked: false,
      ccvConfirmed: false,
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
    this.isFormInvalid = this.isFormInvalid.bind(this);
    this.handleStartDateChange = this.handleStartDateChange.bind(this);
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
    this.setState({ carid: this.props.location.query.carid });
    http
      .client()
      .get("/cars")
      .then(res => {
        this.mapCarToModel(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }

  mapCarToModel(car) {
    // forEach due to current car controller
    car.forEach(element => {
      if (element._id == this.props.location.query.carid) {
        this.setState({
          selectedCar: element,
          selectedLocation: element.location,
        });
      }
    });
  }

  handleBlur(field) {
    this.setState({
      touched: Object.assign({}, this.state.touched, { [field]: true }),
    });
  }

  validate() {
    // true means invalid, so our conditions got reversed
    const errs = {
      // Placeholder ccv validation.
      //    ccv: this.state.input.ccv.length > 4,
      startDate: moment(this.startTime).isSameOrAfter(this.state.endDate),
      endDate: this.state.startDate.isSameOrAfter(this.state.endDate),
    };
    return errs;
  }

  isFormInvalid() {
    return Object.keys(this.errors).some(x => this.errors[x] === true);
  }

  handleStartDateChange(date) {
    this.setState({
      startDate: moment(date),
      endDate: moment(date).add(2, "h"),
    });
    this.expectedCostCal(date, 0, 0);
  }

  handleEndDateChange(date) {
    this.setState({ endDate: date });
    this.expectedCostCal(0, date, 0);
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
    this.tmpCost = hours * this.state.selectedCar.vehicleType.hourlyRate;
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

  handleInput(evt, field) {
    this.setState({
      input: Object.assign({}, this.state.input, { [field]: evt.target.value }),
    });
  }

  handleOfferSubmit(evt) {
    evt.preventDefault();
    //Require backend offer validation function
    console.log(this.state.input.offerCode);
    if (this.state.input.offerCode) {
      http
        .client()
        .put("/offer/", {
          code: this.state.input.offerCode,
        })
        .then(res => {
          this.setState({
            discount: res.data,
          });
          this.expectedCostCal(0, 0, res.data);
          this.sendAlert("couponSuccess");
        })
        .catch(err => {
          console.log(err);
          this.sendAlert("couponError");
        });
    }
  }

  handleCcvConfirmation(evt) {
    evt.preventDefault();
    this.setState({ ccvConfirmed: true });
  }

  handleBooking(evt) {
    evt.preventDefault();
    if (this.isFormInvalid()) {
      this.sendAlert("bookingError");
      return;
    } else {
      http
        .client()
        .post("/booking/", {
          userid: this.state.userid,
          car: this.state.carid,
          startAt: this.state.startDate,
          endAt: this.state.endDate,
          code: this.state.input.offerCode,
        })
        .then(res => {
          this.setState({ cost: res.data.totalCost });
          this.setState({ booked: true });
        })
        .catch(err => {
          console.log(err);
          this.sendAlert("bookingError");
        });
    }
  }

  isError(key) {
    const errorExists = this.errors[key];
    const touched = this.state.touched[key] === true;
    return errorExists && touched;
  }

  renderLabel(key, labelFor) {
    if (this.isError(key)) {
      return (
        <Label htmlFor={labelFor} className={"text-danger"}>
          {this.labels[key]}: {this.errorMsgs[key]}
        </Label>
      );
    }

    return <Label htmlFor={labelFor}>{this.labels[key]}</Label>;
  }

  register() {
    return (
      <div className={styles.body}>
        <h1 className={styles.title}>Please Register</h1>
        <p>
          <Link to="/register">Click here to go to Register</Link>
          <br />
        </p>
      </div>
    );
  }
  goback() {
    return (
      <div className={styles.body}>
        <h1 className={styles.title}>No car was selected</h1>
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

  cvvPrompt() {
    return (
      <div className={styles.body}>
        <h1 className={styles.title}>CVV Confirmation</h1>
        <Form onSubmit={this.handleCcvConfirmation.bind(this)}>
          <FormGroup>
            <Label for="ccv">Please confirm your credit card CVV</Label>
            <Input
              type="text"
              name="ccv"
              id="ccv"
              placeholder="CVV"
              value={this.state.input.ccv}
              onBlur={() => this.handleBlur("ccv")}
              onChange={e => this.handleInput(e, "ccv")}
            />
            <FormFeedback>A valid CVV is required.</FormFeedback>
          </FormGroup>
          <Button outline color="success" className={styles.wideBtn}>
            Confirm
          </Button>
        </Form>
      </div>
    );
  }

  booked() {
    return (
      <div className={stylesMain.body}>
        <h1 className={styles.title}>Booking success</h1>
        <Row>
          <Col sm="12" md="6">
            <hr />
            <Card>
              <CardHeader tag="h5">
                {this.state.selectedCar.year} {this.state.selectedCar.make}{" "}
                {this.state.selectedCar.model} ({this.state.selectedCar.colour}){" "}
                <br />
                <span className="text-muted">
                  {this.state.selectedLocation.name}
                </span>
              </CardHeader>
              <CardBody>
                <CardText>
                  Vehicle type: {this.state.selectedCar.vehicleType.name},{" "}
                  {this.state.selectedCar.doors} doors<br />
                  Seats: {this.state.selectedCar.seats}
                  <br />
                  Hourly rate: ${this.state.selectedCar.vehicleType.hourlyRate.toFixed(
                    2
                  )}
                  <br />
                  Registration: {this.state.selectedCar.rego}
                </CardText>
              </CardBody>
            </Card>
          </Col>
          <Col sm="12" md="6">
            <hr />
            <Card>
              <CardHeader tag="h5">
                Booked from <br />
                <span className="text-muted">
                  {" " +
                    this.state.startDate
                      .format("MMMM Do YYYY HH:mm")
                      .toString() +
                    " "}
                </span>
                to
                <span className="text-muted">
                  {" " +
                    this.state.endDate.format("MMMM Do YYYY HH:mm").toString() +
                    " "}
                </span>
              </CardHeader>
              <CardBody>
                <CardText>Booking Cost : ${this.state.cost.toFixed(
                    2)}</CardText>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col>
            <Link to="/">Click here to return home</Link>
          </Col>
        </Row>
      </div>
    );
  }

  bookingFrm() {
    this.errors = this.validate();

    const isDisabled = this.isFormInvalid();

    return (
      <div className={styles.body}>
        <Row>
          <Col>
            <h1 className={styles.title}>Booking</h1>
          </Col>
        </Row>
        <Alert
          color="danger"
          isOpen={this.state.alert.bookingError}
          toggle={e => this.dismissAlert("bookingError", e)}
        >
          Sorry, please update your booking time and try again.
        </Alert>
        <Row>
          <Col sm="12" md="6">
            <hr />
            <Card>
              <CardHeader tag="h5">
                {this.state.selectedCar.year} {this.state.selectedCar.make}{" "}
                {this.state.selectedCar.model} ({this.state.selectedCar.colour}){" "}
                <br />
                <span className="text-muted">
                  {this.state.selectedLocation.name}
                </span>
              </CardHeader>
              <CardBody>
                <CardText>
                  Vehicle type: {this.state.selectedCar.vehicleType.name},{" "}
                  {this.state.selectedCar.doors} doors<br />
                  Seats: {this.state.selectedCar.seats}
                  <br />
                  Hourly rate: ${this.state.selectedCar.vehicleType.hourlyRate.toFixed(
                    2
                  )}
                  <br />
                  Registration: {this.state.selectedCar.rego}
                </CardText>
              </CardBody>
            </Card>
          </Col>
          <Col sm="12" md="6">
            <hr />
            <h4 className={styles.h4}>Booking Form</h4>
            <FormGroup>
              {this.renderLabel("startDate", "startDate")}
              <DatePicker
                className={
                  "form-control " + this.isError("startDate")
                    ? "is-invalid"
                    : ""
                }
                selected={this.state.startDate}
                onChange={this.handleStartDateChange}
                showTimeSelect
                minDate={this.startTime}
                timeFormat="HH:mm"
                timeIntervals={this.intervalNum}
                dateFormat="LLL"
                onBlur={() => this.handleBlur("startDate")}
                timeCaption="time"
              />
            </FormGroup>
            <FormGroup>
              {this.renderLabel("endDate", "endDate")}
              <DatePicker
                className={
                  "form-control " + this.isError("endDate") ? "is-invalid" : ""
                }
                selected={this.state.endDate}
                onChange={this.handleEndDateChange.bind(this)}
                showTimeSelect
                minDate={this.startTime}
                timeFormat="HH:mm"
                timeIntervals={this.intervalNum}
                dateFormat="LLL"
                onBlur={() => this.handleBlur("endDate")}
                timeCaption="time"
              />
            </FormGroup>
            <FormGroup>
              <Alert
                color="success"
                isOpen={this.state.alert.couponSuccess}
                toggle={e => this.dismissAlert("couponSuccess", e)}
              >
                Coupon Applied.
              </Alert>
              <Alert
                color="danger"
                isOpen={this.state.alert.couponError}
                toggle={e => this.dismissAlert("couponError", e)}
              >
                Coupon invalid or expired.
              </Alert>
              {this.renderLabel("offerCode", "offerCode")}
              <Input
                type="text"
                name="offerCode"
                id="offerCode"
                placeholder="Offer Code"
                className={this.isError("offerCode") ? "is-invalid" : ""}
                onChange={e => this.handleInput(e, "offerCode")}
                onBlur={() => this.handleBlur("offerCode")}
                value={this.state.input.offerCode}
              />
              <Button onClick={e => this.handleOfferSubmit(e)}>
                Apply Offer Code
              </Button>
            </FormGroup>
            <p>Booking Price : $ {this.state.expectedCost}</p>
          </Col>
          <Col md="12" md="6">
            <TimeTable
              key={this.state.selectedCar._id}
              data={this.state.selectedCar}
              setStart={this.handleStartDateChange}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <Button
              onClick={this.handleBooking.bind(this)}
              disabled={this.isDisabled}
              outline
              color="success"
              className={styles.wideBtn}
            >
              Book
            </Button>
          </Col>
        </Row>
      </div>
    );
  }

  render() {
    if (!this.props.location.query.carid) return this.goback();
    else {
      if (!this.state.loggedIn) return this.register();
      else if (this.state.ccvConfirmed) return this.booked();
      else if (this.state.booked && !this.state.ccvConfirmed)
        return this.cvvPrompt();
      else if (!this.state.selectedCar._id) return <span>Loading...</span>;
      else return this.bookingFrm();
    }
  }
}

export default Booking;
