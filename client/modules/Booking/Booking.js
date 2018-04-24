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

  constructor(props) {
    super(props);
    this.state = {
      ccv: "",
      carid: "",
      userid: "",
      selectedCar: {},
      selectedLocation: {},
      startDate: this.startTime,
      endDate: this.endTime,
      selectedCar: false,
      loggedIn: false,
      booked: false,
      ccvConfirmed: false,
      successAlertOpen: false,
      failAlertOpen: false,
      cost: 0,

      validated: true,

      touched: {
        startDate: false,
        endDate: false,
        ccv: false,
      },
    };
    this.isFormInvalid = this.isFormInvalid.bind(this);
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
//    ccv: this.state.ccv.length > 4,
      startDate: moment(this.startTime).isSameOrAfter(this.state.endDate),
      endDate:
        this.state.startDate === this.state.endDate ||
        this.state.startDate.isAfter(this.state.endDate),
    };
    return errs;
  }

  isFormInvalid() {
    return Object.keys(this.errors).some(x => this.errors[x] === true);
  }

  handleStartDateChange(date) {
    this.setState({ startDate: date });
  }

  handleEndDateChange(date) {
    this.setState({ endDate: date });
  }

  handleCcvChange = evt => {
    this.setState({ ccv: evt.target.value });
  };

  handleCcvConfirmation(evt) {
    evt.preventDefault();
    this.setState({ ccvConfirmed: true });
  }

  handleBooking(evt) {
    evt.preventDefault();
    if (this.isFormInvalid()) {
      this.setState({ failAlertOpen: true });
      return;
    } else {
      http
        .client()
        .post("/booking/", {
          userid: this.state.userid,
          car: this.state.carid,
          startAt: this.state.startDate,
          endAt: this.state.endDate,
        })
        .then(res => {
          this.setState({ cost: res.data.totalCost });
          this.setState({ booked: true });
          this.setState({ successAlertOpen: true });
        })
        .catch(err => console.log(err));
      this.setState({ failAlertOpen: true });
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

  render() {
    if (!this.props.location.query.carid) return this.goback();
    else {
      if (!this.state.loggedIn) return this.register();
      else if (this.state.ccvConfirmed) return this.booked();
      else if (this.state.booked && !this.state.ccvConfirmed) return this.cvvPrompt();
      else if (!this.state.selectedCar._id) return <span>Loading...</span>;
      else return this.bookingFrm();
    }
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

  dismissSuccess() {
    this.setState({ successAlertOpen: false });
  }

  dismissFail() {
    this.setState({ failAlertOpen: false });
  }

  handleTimeChange(evt) {
    evt.preventDefault();
    console.log(evt.target.value);
  }

  cvvPrompt() {
    return (
      <Container className={styles.body}>
        <h1 className={styles.title}>CVV Confirmation</h1>
        <Form onSubmit={this.handleCcvConfirmation.bind(this)}>
          <FormGroup>
            <Label for="ccv">Please confirm your credit card CVV</Label>
            <Input
              type="text"
              name="ccv"
              id="ccv"
              placeholder="CVV"
              value={this.state.ccv}
              onBlur={() => this.handleBlur("ccv")}
              onChange={this.handleCcvChange.bind(this)}
            />
            <FormFeedback>A valid CVV is required.</FormFeedback>
          </FormGroup>
          <Button outline color="success" className={styles.wideBtn}>
            Confirm
          </Button>
        </Form>
      </Container>
    );
  }

  booked() {
    return (
      <Container className={styles.body}>
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
                Vehicle Booked from <br />
                <span className="text-muted">{" "+this.state.startDate.format("MMMM Do YYYY HH:mm").toString()+" "}</span>
                to
                <span className="text-muted">{" "+this.state.endDate.format("MMMM Do YYYY HH:mm").toString()+" "}</span>
              </CardHeader>
              <CardBody>
                <CardText>Booking Cost : ${this.state.cost}</CardText>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col>
            <Link to="/">Click here to return home</Link>
          </Col>
        </Row>
      </Container>
    );
  }

  bookingFrm() {
    this.errors = this.validate();
    /*
    Placeholder. isDisabled will be reviewed later to improve implementation
    and enable the book button on based on information from the timetable
    */
    const isDisabled = this.isFormInvalid();
    // Here goes our page
    return (
      <Container className={styles.body}>
        <Row>
          <Col>
            <h1 className={styles.title}>Booking</h1>
          </Col>
        </Row>
        <Alert
          color="success"
          isOpen={this.state.successAlertOpen}
          toggle={this.dismissSuccess.bind(this)}
        >
          Thank you, your booking was made successfully.
        </Alert>
        <Alert
          color="danger"
          isOpen={this.state.failAlertOpen}
          toggle={this.dismissFail.bind(this)}
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
            <Form onSubmit={this.handleTimeChange.bind(this)}>
              <TimeTable
                key={this.state.selectedCar._id}
                data={this.state.selectedCar}
                onRef={ref => (this.child = ref)}
              />
            </Form>
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
                onChange={this.handleStartDateChange.bind(this)}
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
          </Col>
        </Row>
        <Row>
          <Col>
            <Form onSubmit={this.handleBooking.bind(this)}>
              <Button
                disabled={this.isDisabled}
                outline
                color="success"
                className={styles.wideBtn}
              >
                Book
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Booking;
